/**
 * Copyright (c) 2020, Henrik Geißler
 */
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql'

import Post from '../../entities/Post'
import User from '../../entities/User'
import isAuth from '../../middleware/isAuth'
import { MyContext } from '../../types'
import creator from './fields/creator'
import textSnippet from './fields/textSnippet'
import voteStatus from './fields/voteStatus'
import createPost from './mutations/createPost'
import deletePost from './mutations/deletePost'
import updatePost from './mutations/updatePost'
import vote from './mutations/vote'
import getPost from './queries/getPost'
import getPosts from './queries/getPosts'
import PaginatedPosts from './types/PaginatedPosts'
import PostInput from './types/PostInput'
import PostUpdateInput from './types/PostUpdateInput'
import VoteInput from './types/VoteInput'

@Resolver(Post)
class PostResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() post: Post): string {
    return textSnippet(post)
  }

  @FieldResolver(() => User)
  creator(@Root() post: Post, @Ctx() { userLoader }: MyContext): Promise<User> {
    return creator(userLoader, post)
  }

  @FieldResolver(() => Int, { nullable: true })
  async voteStatus(
    @Root() post: Post,
    @Ctx() { req, updootLoader }: MyContext
  ): Promise<number | null> {
    return voteStatus(req, updootLoader, post)
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg('input') { postId, value }: VoteInput,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    return vote(value, req, postId)
  }

  @Query(() => PaginatedPosts)
  async posts(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true })
    cursor: string | null | undefined
  ): Promise<PaginatedPosts> {
    return getPosts(limit, cursor)
  }

  @Query(() => Post, { nullable: true })
  post(@Arg('id', () => Int) postId: number): Promise<Post | undefined> {
    return getPost(postId)
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg('input') input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    return createPost(input, req)
  }

  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(isAuth)
  async updatePost(
    @Arg('input') { postId, text, title }: PostUpdateInput,
    @Ctx() { req }: MyContext
  ): Promise<Post | null> {
    return updatePost(text, title, req, postId)
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg('id', () => Int) postId: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    return deletePost(req, postId)
  }
}

export default PostResolver
