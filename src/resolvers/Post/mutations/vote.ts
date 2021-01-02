/**
 * Copyright (c) 2020, Henrik Geißler
 */
import { getConnection } from 'typeorm'

import Updoot from '../../../entities/Updoot'

const vote = async (
  value: number,
  request,
  postId: number
): Promise<boolean> => {
  const isUpdoot = value !== -1
  const realValue = isUpdoot ? 1 : -1
  const { userId } = request.session
  const updoot = await Updoot.findOne({ where: { postId, userId } })
  // the user has voted on the post before
  // and they are changing their vote
  if (updoot && updoot.value !== realValue) {
    await getConnection().transaction(async postgres => {
      await postgres.query(
        `
    update updoot
    set value = $1
    where "postId" = $2 and "userId" = $3
        `,
        [realValue, postId, userId]
      )
      await postgres.query(
        `
          update post
          set points = points + $1
          where id = $2
        `,
        [2 * realValue, postId]
      )
    })
  } else if (!updoot) {
    // has never voted before
    await getConnection().transaction(async postgres => {
      await postgres.query(
        `
    insert into updoot ("userId", "postId", value)
    values ($1, $2, $3)
        `,
        [userId, postId, realValue]
      )
      await postgres.query(
        `
    update post
    set points = points + $1
    where id = $2
      `,
        [realValue, postId]
      )
    })
  }

  return true
}

export default vote
