/**
 * Copyright (c) 2020, Henrik Geißler
 */
/* eslint-disable unicorn/prevent-abbreviations */
declare namespace NodeJS {
  export interface ProcessEnvironment {
    CORS_ORIGIN: string
    DATABASE_URL: string
    PORT: string
    REDIS_URL: string
    SESSION_SECRET: string
  }
}
