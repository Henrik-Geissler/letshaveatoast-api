/**
 * Copyright (c) 2020, Henrik Geißler
 */
import { getConnection } from 'typeorm'

const getPosts = async (limit: number, cursor: string | null | undefined) => {
  const realLimit = Math.min(50, limit)
  const reaLimitPlusOne = realLimit + 1
  const replacements: Array<number | Date> = [reaLimitPlusOne]
  if (cursor) {
    replacements.push(new Date(Number.parseInt(cursor, 10)))
  }
  const posts = await getConnection().query(
    `
    select p.*
    from post p
    ${cursor ? `where p."createdAt" < $2` : ''}
    order by p."createdAt" DESC
    limit $1
    `,
    replacements
  )

  return {
    hasMore: posts.length === reaLimitPlusOne,
    posts: posts.slice(0, realLimit),
  }
}

export default getPosts
