/**
 * Copyright (c) 2020, Henrik Geißler
 */
import { Query, Resolver } from 'type-graphql'

@Resolver()
class HelloResolver {
  @Query(() => String)
  hello(): string {
    return 'hello whaat'
  }
}

export default HelloResolver
