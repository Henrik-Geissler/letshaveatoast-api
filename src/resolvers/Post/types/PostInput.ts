/**
 * Copyright (c) 2020, Henrik Geißler
 */
import { Field, InputType } from 'type-graphql'

@InputType()
abstract class PostInput {
  @Field()
  title: string

  @Field()
  text: string
}

export default PostInput
