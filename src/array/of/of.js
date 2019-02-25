import Validator from 'src/validator'

import throwIf from 'src/helpers/throwIf'

const NO_TYPE =
  'The type validator must be provided'

const INVALID_TYPE =
  'The type validator must be an object with `test` and `report` methods'

function of(type) {
  throwIf(
    type === undefined,
    TypeError, NO_TYPE
  )

  throwIf(
    typeof type !== 'object'
    || type === null
    || typeof type.test !== 'function'
    || typeof type.report !== 'function',
    TypeError, INVALID_TYPE
  )

  this.test = function test(value) {
    if ( !this.parent.test(value) ) return false
    return value.every(testElementWith(type))
  }

  this.report = reportWith(type)

  return this
}

function testElementWith(type) {
  return function testElement(element) {
    return type.test(element)
  }
}

function reportWith(type) {
  return function report(value) {
    if ( this.test(value) ) return false

    const parentReport = this.parent.report(value)
    if ( parentReport ) return parentReport

    return value.reduce(reportElementWith(type), {})
  }
}

function reportElementWith(type) {
  return function reportElement(errors, element, index) {
    if ( type.test(element) ) return errors
    errors[index] = type.report(element)
    return errors
  }
}

export default Validator.make(of)
