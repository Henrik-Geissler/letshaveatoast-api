/**
 * Copyright (c) 2020, Henrik Geißler
 */
const creator = (userLoader, post) => {
  return userLoader.load(post.creatorId)
}

export default creator
