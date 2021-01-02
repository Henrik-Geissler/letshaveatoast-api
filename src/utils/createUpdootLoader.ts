/**
 * Copyright (c) 2020, Henrik Geißler
 */
import DataLoader from 'dataloader'

import Updoot from '../entities/Updoot'

const createUpdootLoader = (): DataLoader<
  { postId: number; userId: number },
  Updoot | null
> => {
  return new DataLoader<{ postId: number; userId: number }, Updoot | null>(
    async keys => {
      const updoots = await Updoot.findByIds(keys as Array<any>)
      const updootIdsToUpdoot: Record<string, Updoot> = {}
      updoots.forEach(updoot => {
        updootIdsToUpdoot[`${updoot.userId}|${updoot.postId}`] = updoot
      })

      return keys.map(key => {
        return updootIdsToUpdoot[`${key.userId}|${key.postId}`]
      })
    }
  )
}

export default createUpdootLoader
