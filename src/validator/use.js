import throwIf from 'src/helpers/throwIf'
import Validator from './Validator'

import * as Errors from './errors'

function use(name, validator) {
  throwIf(
    typeof name !== 'string',
    TypeError, Errors.INVALID_NESTED_VALIDATOR_NAME
  )

  throwIf(
    typeof validator !== 'function',
    TypeError, Errors.INVALID_NESTED_VALIDATOR
  )

  this[name] = function createNestedValidator() {
    let feedback;
    if (arguments.length > validator.length
        && typeof arguments[validator.length] === 'string')
      feedback = arguments[validator.length];

    const context = new Validator(name, this, feedback);
    const result = validator.apply(context, arguments)

    validator.chained.forEach(
      function applyChainedValidator([name, nestedValidator]) {
        result.use(name, nestedValidator)
      }
    )

    return result
  }
}

export default use
