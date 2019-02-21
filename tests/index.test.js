import { expect } from 'chai'

import testValidator from './validator.test'

import testRequired from './required.test'
import testOptional from './optional.test'

import testBoolean from './boolean.test'
import testNumber from './number.test'
import testString from './string.test'
import testFunction from './function.test'
import testArray from './array.test'
import testObject from './object.test'
import testInstanceOf from './instanceOf.test'

import testHelpers from './helpers.test'

describe('Regler', () => {

  describe('Validator', testValidator)

  describe('Native validators', () => {

    describe('required', testRequired)
    describe('optional', testOptional)

    describe('boolean', testBoolean)
    describe('number', testNumber)
    describe('string', testString)
    describe('function', testFunction)
    describe('array', testArray)
    describe('object', testObject)
    describe('instanceOf', testInstanceOf)

  })

  describe('Helpers', testHelpers)

})
