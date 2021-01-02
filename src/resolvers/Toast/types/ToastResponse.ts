/**
 * Copyright (c) 2020, Henrik Geißler
 */
import { Field, ObjectType } from 'type-graphql'

import Toast from '../../../entities/Toast'
import FieldError from '../../../types/FieldError'

@ObjectType()
abstract class ToastResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => Toast, { nullable: true })
  toast?: Toast
}

export default ToastResponse
