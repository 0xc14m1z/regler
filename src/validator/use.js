import throwIf from 'src/helpers/throwIf'
import Validator from './Validator'

import * as Errors from './errors'

/*

This is the internal way of how a validator is actually chained to another.

It creates a function property named as indicated in the first parameter.
This function:

  1. tries to guess the feedback message when it will get called;
  2. create a new raw Validator linked to the current one;
  3. obtain a specialized instance running the given validator
  4. chains nested validators to the given one recursively calling this function

When these steps are done, the brand new validator instance is returned so that
`test` or `report` methods can be called on it.

*/
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
    const feedback = guessFeedbackMessage(arguments, validator),
          context = new Validator(name, this, feedback),
          validatorInstance = validator.apply(context, arguments)

    validator.chained.forEach(chainNestedValidatorTo(validatorInstance))

    return validatorInstance
  }
}

/*

This function tries to guess the feedback message, if provided.
It checks if the number of arguments given to a validator when it gets called
exceed the number of arguments handled. If so, it checks whether the last
argument is a string. If it is, that will be the feedback.

For instance, with an ipothetic greaterThan validator like the following:

function greaterThan(compareTo) {
  this.test = function (value) {
    return value > compareTo
  }
}

If it gets called with two parameters, and the second is a string, that one
will be the feedback message:

greaterThan(100, 'should be greater than 100')

*/
function guessFeedbackMessage(args, validatorFn) {
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
