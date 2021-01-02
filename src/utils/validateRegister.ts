/**
 * Copyright (c) 2020, Henrik Geißler
 */
import UsernamePasswordInput from '../types/UsernamePasswordInput'

interface FieldError {
  field: string

  message: string
}
const validateRegister = (
  options: UsernamePasswordInput
): null | Array<FieldError> => {
  if (!options.email.includes('@')) {
    return [
      {
        field: 'email',
        message: 'invalid email',
      },
    ]
  }
  if (options.username.length <= 2) {
    return [
      {
        field: 'username',
        message: 'length must be greater than 2',
      },
    ]
  }
  if (options.username.includes('@')) {
    return [
      {
        field: 'username',
        message: 'cannot include an @',
      },
    ]
  }
  if (options.password.length <= 2) {
    return [
      {
        field: 'password',
        message: 'length must be greater than 2',
      },
    ]
  }

  return null
}

export default validateRegister
