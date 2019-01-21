import { expect } from 'chai'

import testValidate from './validate.test'

import testRequired from './required.test'
import testOptional from './optional.test'
import testNumber from './number.test'
import testBoolean from './boolean.test'
import testString from './string.test'
import testArray from './array.test'
import testFunction from './fn.test'
import testObject from './object.test'
import testInstanceOf from './instanceOf.test'
import testEnum from './enum.test'
import testUnion from './union.test'

import testThrowIf from './throwIf.test'
import testArgumentsArray from './argumentsArray.test'
import testChain from './chain.test'

import testCompose from './helpers.test/compose.test'

describe('Regler', () => {
  describe('validate', testValidate)

  describe('required', testRequired)
  describe('optional', testOptional)
  describe('number', testNumber)
  describe('boolean', testBoolean)
  describe('string', testString)
  describe('array', testArray)
  describe('fn', testFunction)
  describe('object', testObject)
  describe('instanceOf', testInstanceOf)
  describe('enum', testEnum)
  describe('union', testUnion)

  describe('helpers', () => {
    describe('throwIf', testThrowIf)
    describe('argumentsArray', testArgumentsArray)
    describe('chain', testChain)
    describe('compose', testCompose)
  })
})
