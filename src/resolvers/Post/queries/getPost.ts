/**
 * Copyright (c) 2020, Henrik Geißler
 */
import Post from '../../../entities/Post'

const getPost = (postId: number): Promise<Post | undefined> => {
  return Post.findOne(postId)
}

export default getPost
