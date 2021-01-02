/**
 * Copyright (c) 2020, Henrik Geißler
 */
import Post from '../../../entities/Post'
import PostInput from '../types/PostInput'

const createPost = (input: PostInput, request): Post | PromiseLike<Post> => {
  return Post.create({
    ...input,
    creatorId: request.session.userId,
  }).save()
}

export default createPost
