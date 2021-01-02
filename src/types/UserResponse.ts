/**
 * Copyright (c) 2020, Henrik Geißler
 */
import { Field, ObjectType } from 'type-graphql'

import User from '../entities/User'
import FieldError from './FieldError'

@ObjectType()
abstract class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => User, { nullable: true })
  user?: User
}

export default UserResponse
