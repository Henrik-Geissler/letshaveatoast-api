/**
 * Copyright (c) 2020, Henrik Geißler
 */
import { Field, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import Post from './Post'
import Updoot from './Updoot'

@ObjectType()
@Entity()
class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column({ unique: true })
  username!: string

  @Field()
  @Column({ unique: true })
  email!: string

  @Column()
  password!: string

  @OneToMany(() => Post, post => post.creator)
  posts: Post[]

  @OneToMany(() => Updoot, updoot => updoot.user)
  updoots: Updoot[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}

export default User
