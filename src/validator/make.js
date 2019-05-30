import throwIf from '../helpers/throwIf'

import * as Errors from './errors'

/*

This method is a higher order function that enhance
the `validator` parameter in input adding two properties:

  1. chained: array
  2. chain: function(string, function)

This allows to create extensible validators due to
the function reference mechanism of JavaScript.

*/
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
