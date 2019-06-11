import Validator from '../validator'

import throwIf from '../helpers/throwIf'

const NO_ACCEPTABLE_VALUES =
  'The acceptable values list must be provided'

const INVALID_ACCEPTABLE_VALUES =
  'The acceptable values list must be an array'

const EMPTY_ACCEPTABLE_VALUES =
  'The acceptable values list must not be empty'

function oneOf(acceptableValues) {
  throwIf(
    acceptableValues === undefined,
    TypeError, NO_ACCEPTABLE_VALUES
  )

  throwIf(
    !(acceptableValues instanceof Array),
    TypeError, INVALID_ACCEPTABLE_VALUES
  )

  throwIf(
    acceptableValues.length === 0,
    TypeError, EMPTY_ACCEPTABLE_VALUES
  )

  this.test = function test(value) {
    if ( !this.parent.test(value) ) return false
    return acceptableValues.includes(value)
  }

  return this
}

export default Validator.make(oneOf)
