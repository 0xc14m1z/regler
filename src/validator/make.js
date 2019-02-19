import throwIf from 'src/helpers/throwIf'

import * as Errors from './errors'

function make(validator) {
  throwIf(
    typeof validator !== 'function',
    TypeError, Errors.INVALID_VALIDATOR
  )

  validator.chained = []

  validator.chain = function chain(name, nestedValidator) {
    throwIf(
      typeof name !== 'string',
      TypeError, Errors.INVALID_NESTED_VALIDATOR_NAME
    )

    throwIf(
      typeof nestedValidator !== 'function',
      TypeError, Errors.INVALID_NESTED_VALIDATOR
    )

    this.chained.push([name, nestedValidator]);
  }

  return validator
}

export default make
