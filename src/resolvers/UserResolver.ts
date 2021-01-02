/**
 * Copyright (c) 2020, Henrik Geißler
 */
import argon2 from 'argon2'
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql'
import { getConnection } from 'typeorm'
import { v4 } from 'uuid'

import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from '../config'
import User from '../entities/User'
import { MyContext } from '../types'
import UsernamePasswordInput from '../types/UsernamePasswordInput'
import UserResponse from '../types/UserResponse'
import { sendEmail } from '../utils/sendEmail'
import validateRegister from '../utils/validateRegister'

@Resolver(User)
class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext): string {
    // this is the current user and its ok to show them their own email
    if (req.session.userId === user.id) {
      return user.email
    }

    return ''
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length <= 8) {
      return {
        errors: [
          {
            field: 'newPassword',
            message: 'length must be greater than 8',
          },
        ],
      }
    }
    const key = FORGET_PASSWORD_PREFIX + token
    const userId = await redis.get(key)
    if (!userId) {
      return {
        errors: [
          {
            field: 'token',
            message: 'token expired',
          },
        ],
      }
    }
    const userIdNumber = Number.parseInt(userId, 10)
    const user = await User.findOne(userIdNumber)
    if (!user) {
      return {
        errors: [
          {
            field: 'token',
            message: 'user no longer exists',
          },
        ],
      }
    }
    await User.update(
      { id: userIdNumber },
      {
        password: await argon2.hash(newPassword),
      }
    )
    await redis.del(key)
    // log in user after change password
    req.session.userId = user.id

    return { user }
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return true
    }
    const token = v4()
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      'ex',
      1_000 * 60 * 60 * 24 * 3
    )
    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">reset password</a>`
    )

    return true
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext): Promise<User | undefined> | null {
    // you are not logged in
    if (!req.session.userId) {
      return null
    }

    return User.findOne(req.session.userId)
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options)
    if (errors) {
      return { errors }
    }
    const hashedPassword = await argon2.hash(options.password)
    let user
    try {
      // User.create({}).save()
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          email: options.email,
          password: hashedPassword,
          username: options.username,
        })
        .returning('*')
        .execute()
      user = result.raw[0]
    } catch (error) {
      if (error.code === '23505') {
        return {
          errors: [
            {
              field: 'username',
              message: 'username already taken',
            },
          ],
        }
      }
    }
    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    req.session.userId = user.id

    return { user }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes('@')
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    )
    if (!user) {
      return {
        errors: [
          {
            field: 'usernameOrEmail',
            message: "that username doesn't exist",
          },
        ],
      }
    }
    const valid = await argon2.verify(user.password, password)
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect password',
          },
        ],
      }
    }
    req.session.userId = user.id

    return {
      user,
    }
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise(resolve =>
      req.session.destroy((error: any) => {
        res.clearCookie(COOKIE_NAME)
        if (error) {
          console.log(error)
          resolve(false)

          return
        }
        resolve(true)
      })
    )
  }
}

export default UserResolver
