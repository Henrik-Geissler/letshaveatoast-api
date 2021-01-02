/**
 * Copyright (c) 2020, Henrik Geißler
 */
import Post from '../../../entities/Post'

const deletePost = async (request, postId): Promise<boolean> => {
  try {
    await Post.delete({ creatorId: request.session.userId, id: postId })
  } catch {
    return false
  }

  return true
}

export default deletePost
