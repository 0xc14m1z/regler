import Validator from 'src/validator'

import throwIf from '../helpers/throwIf'

export const INVALID_COMPARE_CLASS =
  'The comparison class must be provided'

function instanceOf(compareClass) {
  throwIf(
    compareClass === undefined,
    TypeError, INVALID_COMPARE_CLASS
  )

  this.test = function test(value) {
    return this.parent.test(value) && value instanceof compareClass
  }

  return this
}

export default Validator.make(instanceOf)
