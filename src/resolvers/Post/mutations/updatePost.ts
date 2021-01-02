/**
 * Copyright (c) 2020, Henrik Geißler
 */
import { getConnection } from 'typeorm'

import Post from '../../../entities/Post'

const updatePost = async (
  text: string,
  title: string,
  request,
  postId: number
) => {
  const result = await getConnection()
    .createQueryBuilder()
    .update(Post)
    .set({ text, title })
    .where('id = :postId and "creatorId" = :creatorId', {
      creatorId: request.session.userId,
      postId,
    })
    .returning('*')
    .execute()

  return result.raw[0]
}

export default updatePost
