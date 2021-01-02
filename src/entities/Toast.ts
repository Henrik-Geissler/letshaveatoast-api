/**
 * Copyright (c) 2020, Henrik Geißler
 */
import { Field, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@ObjectType()
@Entity()
class Toast extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @Column()
  name!: string

  @Field()
  @Column()
  message!: string

  @Field(() => Int)
  @Column()
  amount!: number

  @Field(() => Int)
  @Column()
  category!: number
}

export default Toast
