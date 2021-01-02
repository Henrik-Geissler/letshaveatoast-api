/**
 * Copyright (c) 2020, Henrik Geißler
 */

import { Field, ObjectType } from 'type-graphql'

@ObjectType()
abstract class FieldError {
  @Field()
  field: string

  @Field()
  message: string
}

export default FieldError
