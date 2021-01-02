/**
 * Copyright (c) 2020, Henrik Geißler
 */
import { Field, InputType, Int } from 'type-graphql'

@InputType()
abstract class PostUpdateInput {
  @Field(() => Int)
  postId: number

  @Field()
  title: string

  @Field()
  text: string
}

export default PostUpdateInput
