/**
 * Copyright (c) 2020, Henrik Geißler
 */
import { Field, InputType, Int } from 'type-graphql'

@InputType()
abstract class ToastInput {
  @Field()
  name: string

  @Field()
  message: string

  @Field(() => Int)
  amount: number

  @Field(() => Int)
  category: number
}

export default ToastInput
