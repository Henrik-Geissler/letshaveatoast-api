/**
 * Copyright (c) 2020, Henrik Geißler
 */
import { Field, ObjectType } from 'type-graphql'

import Post from '../../../entities/Post'

@ObjectType()
abstract class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[]

  @Field()
  hasMore: boolean
}

export default PaginatedPosts
