/**
 * Copyright (c) 2020, Henrik Geißler
 */
import { Field, InputType, Int } from 'type-graphql'

@InputType()
abstract class VoteInput {
  @Field(() => Int)
  postId: number

  @Field(() => Int)
  value: number
}

export default VoteInput
