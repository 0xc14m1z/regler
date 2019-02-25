import Validator from 'src/validator'

import throwIf from '../../helpers/throwIf'

const NO_SCHEMA =
  'The shape schema must be provided'

const INVALID_SCHEMA =
  'The shape schema must be an object'

function shape(schema) {
  throwIf(
    schema === undefined,
    TypeError, NO_SCHEMA
  )

  throwIf(
    typeof schema !== 'object'
    || schema === null
    || schema instanceof Array,
    TypeError, INVALID_SCHEMA
  )

  this.test = function test(value) {
    if ( !this.parent.test(value) ) return false
    return Object.entries(schema).reduce(testPropertyWith(value), true)
  }

  this.report = function report(value) {
    if ( this.test(value) ) return false

    const parentReport = this.parent.report(value)
    if ( parentReport ) return parentReport

    return Object.entries(schema).reduce(reportPropertyWith(value), {})
  }

  return this
}

function testPropertyWith(value) {
  return function testProperty(result, [property, validator]) {
    if ( !value.hasOwnProperty(property) ) return result
    return result && validator.test(value[property])
  }
}

function reportPropertyWith(value) {
  return function reportProperty(errors, [property, validator]) {
    if ( !value.hasOwnProperty(property) ) return errors

    const propertyValue = value[property]

    if ( validator.test(propertyValue) ) return errors
    errors[property] = validator.report(propertyValue)

    return errors
  }
}

export default Validator.make(shape)
