/**
 * Copyright (c) 2020, Henrik Geißler
 */
/* eslint-disable node/no-process-env */

// * ENV
// start-enforce-alphabetization

export const CORS_ORIGIN = String(process.env.CORS_ORIGIN ?? '')

export const DATABASE_URL = String(process.env.DATABASE_URL ?? '')

export const PORT = Number.parseInt(process.env.PORT ?? '4000', 10)

export const PRODUCTION = process.env.NODE_ENV === 'production'

export const REDIS_URL = String(process.env.REDIS_URL ?? '')

export const SESSION_SECRET = String(process.env.SESSION_SECRET ?? '')

// end-enforce-alphabetization

// * GLOBAL
// start-enforce-alphabetization

export const COOKIE_NAME = 'qid'

export const FORGET_PASSWORD_PREFIX = 'forget-password:'

// end-enforce-alphabetization
