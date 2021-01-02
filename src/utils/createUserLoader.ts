/**
 * Copyright (c) 2020, Henrik Geißler
 */
import DataLoader from 'dataloader'

import User from '../entities/User'

const createUserLoader = (): DataLoader<number, User> =>
  new DataLoader<number, User>(async userIds => {
    const users = await User.findByIds(userIds as number[])
    const userIdToUser: Record<number, User> = {}
    users.forEach(eachUser => {
      userIdToUser[eachUser.id] = eachUser
    })

    return userIds.map(userId => userIdToUser[Number(userId)])
  })

export default createUserLoader
