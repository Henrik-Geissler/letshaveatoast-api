/**
 * Copyright (c) 2020, Henrik Geißler
 */
import { Request, Response } from 'express'
import { Redis } from 'ioredis'

import createUpdootLoader from './utils/createUpdootLoader'
import createUserLoader from './utils/createUserLoader'

export type MyContext = {
  redis: Redis
  req: Request & { session: any }
  res: Response
  updootLoader: ReturnType<typeof createUpdootLoader>
  userLoader: ReturnType<typeof createUserLoader>
}
