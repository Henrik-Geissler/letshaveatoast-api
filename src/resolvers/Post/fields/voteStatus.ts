/**
 * Copyright (c) 2020, Henrik Geißler
 */
const voteStatus = async (request, updootLoader, post) => {
  if (!request.session.userId) {
    return null
  }
  const updoot = await updootLoader.load({
    postId: post.id,
    userId: request.session.userId,
  })

  return updoot ? updoot.value : null
}

export default voteStatus
