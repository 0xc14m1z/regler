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
    const feedback = guessFeedback(arguments, validator),
          context = new Validator(name, this, feedback),
          validatorInstance = validator.apply(context, arguments)

    validator.chained.forEach(chainNestedValidatorTo(validatorInstance))

    return validatorInstance
  }
}

function guessFeedback(args, validatorFn) {
  if ( args.length < validatorFn.length ) return undefined

  const lastArgument = args[validatorFn.length]
  if ( typeof lastArgument !== 'string' ) return undefined

  return lastArgument
}

function chainNestedValidatorTo(validator) {
  return function chainNestedValidator([name, nestedValidator]) {
    validator.use(name, nestedValidator)
  }
}

export default use
