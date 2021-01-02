/**
 * Copyright (c) 2020, Henrik Geißler
 */
import 'reflect-metadata'
import 'dotenv-safe/config'

import { ApolloServer } from 'apollo-server-express'
import connectRedis from 'connect-redis'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import Redis from 'ioredis'
import path from 'path'
import { buildSchema } from 'type-graphql'
import { createConnection, getConnection } from 'typeorm'

import {
  COOKIE_NAME,
  CORS_ORIGIN,
  DATABASE_URL,
  PORT,
  PRODUCTION,
  REDIS_URL,
  SESSION_SECRET,
} from './config'
import Post from './entities/Post'
import Stats from './entities/Stats'
import Toast from './entities/Toast'
import Updoot from './entities/Updoot'
import User from './entities/User'
import HelloResolver from './resolvers/HelloResolver'
import PostResolver from './resolvers/Post/PostResolver'
import ToastResolver from './resolvers/Toast/ToastResolver'
import UserResolver from './resolvers/UserResolver'
import createUpdootLoader from './utils/createUpdootLoader'
import createUserLoader from './utils/createUserLoader'

const main = async () => {
  // const conn =
  await createConnection({
    entities: [Post, User, Updoot, Toast, Stats],
    logging: true,
    migrations: [path.join(__dirname, './migrations/*')],
    synchronize: true,
    type: 'postgres',
    url: DATABASE_URL,
  })
  // await conn.runMigrations();
  const app = express()
  const RedisStore = connectRedis(session)
  const redis = new Redis(REDIS_URL)
  app.set('trust proxy', 1)
  app.use(
    cors({
      credentials: true,
      origin: CORS_ORIGIN,
    })
  )
  app.use(
    session({
      cookie: {
        domain: PRODUCTION ? '.fullstack.fun' : undefined,
        httpOnly: true,
        maxAge: 1_000 * 60 * 60 * 24 * 365 * 10,
        sameSite: 'lax',
        secure: PRODUCTION,
      },
      name: COOKIE_NAME,
      resave: false,
      saveUninitialized: false,
      secret: SESSION_SECRET,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
    })
  )
  const apolloServer = new ApolloServer({
    context: ({ req, res }) => ({
      redis,
      req,
      res,
      updootLoader: createUpdootLoader(),
      userLoader: createUserLoader(),
    }),
    // TODO: rm intro & playground in prod
    introspection: true,
    playground: true,
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver, ToastResolver],
      validate: false,
    }),
  })
  apolloServer.applyMiddleware({
    app,
    cors: false,
  })
  setInterval(() => {
    try {
      let category
      let categorySum
      let name
      let nameSum
      category = [0, 0, 0, 0, 0, 0, 0, 0, 0]
      categorySum = [0, 0, 0, 0, 0, 0, 0, 0, 0]
      name = []
      nameSum = []
      try {
        getConnection().query(
          `
            DELETE FROM stats WHERE id = any (array(SELECT id FROM stats p ORDER BY p."createdAt" LIMIT 1));
          `
        )
      } catch {
        console.log('nothing to delete')
      }
      getConnection()
        .query(
          `
            select p.*
            from toast p
          `
        )
        .then(res => {
          console.log(res)
          let nameObjects = [['notset', 0]]
          nameObjects = [['notset', 0]]
          const actual = [0, 1, 5, 10, 20, 50, 100]
          res.forEach((element: Toast) => {
            const actualA = actual[element.amount]
            category[element.category]++
            categorySum[element.category] += actualA
            let exists = false
            for (const each of nameObjects) {
              if (each[0] === element.name) {
                each[1] = Number.parseInt(String(each[1])) + actualA
                exists = true
                break
              }
            }
            if (!exists) {
              const l = nameObjects.length
              nameObjects.push([])
              nameObjects[l][0] = element.name
              nameObjects[l][1] = actualA
            }
          })
          nameObjects.sort(function (a, b) {
            return Number(b[1]) - Number(a[1])
          })
          while (nameObjects.length < 10) {
            const l = nameObjects.length
            nameObjects.push([])
            nameObjects[l][0] = 'notset'
            nameObjects[l][1] = 0
          }
          for (let index = 0; index < 10; index++) {
            name[index] = nameObjects[index][0]
            nameSum[index] = nameObjects[index][1]
          }
          try {
            getConnection()
              .createQueryBuilder()
              .insert()
              .into(Stats)
              .values({
                category1: category[0],
                category2: category[1],
                category3: category[2],
                category4: category[3],
                category5: category[4],
                category6: category[5],
                category7: category[6],
                category8: category[7],
                category9: category[8],
                categorySum1: categorySum[0],
                categorySum2: categorySum[1],
                categorySum3: categorySum[2],
                categorySum4: categorySum[3],
                categorySum5: categorySum[4],
                categorySum6: categorySum[5],
                categorySum7: categorySum[6],
                categorySum8: categorySum[7],
                categorySum9: categorySum[8],
                name1: name[0],
                name2: name[1],
                name3: name[2],
                name4: name[3],
                name5: name[4],
                name6: name[5],
                name7: name[6],
                name8: name[7],
                name9: name[8],
                name10: name[9],
                nameSum1: nameSum[0],
                nameSum2: nameSum[1],
                nameSum3: nameSum[2],
                nameSum4: nameSum[3],
                nameSum5: nameSum[4],
                nameSum6: nameSum[5],
                nameSum7: nameSum[6],
                nameSum8: nameSum[7],
                nameSum9: nameSum[8],
                nameSum10: nameSum[9],
              })
              .returning('*')
              .execute()
          } catch (error) {
            console.log(error)

            return error
          }

          return true
        })
    } catch (error) {
      return error
    }
  }, 60_000)
  app.listen(PORT, () => {})
}
main().catch(error => {
  console.error(error)
})
