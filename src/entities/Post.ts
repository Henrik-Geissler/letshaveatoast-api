/**
 * Copyright (c) 2020, Henrik Geißler
 */
import { Field, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import Updoot from './Updoot'
import User from './User'

@ObjectType()
@Entity()
class Post extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  title!: string

  @Field()
  @Column()
  text!: string

  @Field(() => Int)
  @Column({ default: 0, type: 'int' })
  points!: number

  @Field(() => Int, { nullable: true })
  // 1 or -1 or null
  voteStatus: number | null

  @Field(() => Int)
  @Column()
  creatorId: number

  @Field()
  @ManyToOne(() => User, user => user.posts)
  creator: User

  @OneToMany(() => Updoot, updoot => updoot.post)
  updoots: Updoot[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}

export default Post
