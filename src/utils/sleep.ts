/**
 * Copyright (c) 2020, Henrik Geißler
 */
const sleep = (milliseconds: number): Promise<unknown> =>
  new Promise(resolve => setTimeout(resolve, milliseconds))

export default sleep
