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
class Stats extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @Column({})
  name1!: string

  @Field(() => String)
  @Column({})
  name2!: string

  @Field(() => String)
  @Column({})
  name3!: string

  @Field(() => String)
  @Column({})
  name4!: string

  @Field(() => String)
  @Column({})
  name5!: string

  @Field(() => String)
  @Column({})
  name6!: string

  @Field(() => String)
  @Column({})
  name7!: string

  @Field(() => String)
  @Column({})
  name8!: string

  @Field(() => String)
  @Column({})
  name9!: string

  @Field(() => String)
  @Column({})
  name10!: string

  @Field(() => Int)
  @Column()
  nameSum1!: number

  @Field(() => Int)
  @Column()
  nameSum2!: number

  @Field(() => Int)
  @Column()
  nameSum3!: number

  @Field(() => Int)
  @Column()
  nameSum4!: number

  @Field(() => Int)
  @Column()
  nameSum5!: number

  @Field(() => Int)
  @Column()
  nameSum6!: number

  @Field(() => Int)
  @Column()
  nameSum7!: number

  @Field(() => Int)
  @Column()
  nameSum8!: number

  @Field(() => Int)
  @Column()
  nameSum9!: number

  @Field(() => Int)
  @Column()
  nameSum10!: number

  @Field(() => Int)
  @Column()
  category1!: number

  @Field(() => Int)
  @Column()
  category2!: number

  @Field(() => Int)
  @Column()
  category3!: number

  @Field(() => Int)
  @Column()
  category4!: number

  @Field(() => Int)
  @Column()
  category5!: number

  @Field(() => Int)
  @Column()
  category6!: number

  @Field(() => Int)
  @Column()
  category7!: number

  @Field(() => Int)
  @Column()
  category8!: number

  @Field(() => Int)
  @Column()
  category9!: number

  @Field(() => Int)
  @Column()
  categorySum1!: number

  @Field(() => Int)
  @Column()
  categorySum2!: number

  @Field(() => Int)
  @Column()
  categorySum3!: number

  @Field(() => Int)
  @Column()
  categorySum4!: number

  @Field(() => Int)
  @Column()
  categorySum5!: number

  @Field(() => Int)
  @Column()
  categorySum6!: number

  @Field(() => Int)
  @Column()
  categorySum7!: number

  @Field(() => Int)
  @Column()
  categorySum8!: number

  @Field(() => Int)
  @Column()
  categorySum9!: number
}

export default Stats
