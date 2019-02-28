import { expect } from 'chai'

import R from 'src'

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
import testOneOf from './oneOf.test'

import testHelpers from './helpers.test'

describe('Regler', () => {

  it('should have all native validators chained', () => {
    expect(R.boolean).to.be.a('function')
    expect(R.number).to.be.a('function')
    expect(R.string).to.be.a('function')
    expect(R.function).to.be.a('function')
    expect(R.array).to.be.a('function')
    expect(R.object).to.be.a('function')
    expect(R.instanceOf).to.be.a('function')
    expect(R.oneOf).to.be.a('function')
  })

  it('should work as a normal validator', () => {
    expect(R.number().test(4)).to.be.true
    expect(R.string().report(4)).to.equal('string')
    expect(
      R.array().of(R.number('should be a number'))
       .report(['element', 42, 'other'])
    ).to.deep.equal({
      0: 'should be a number',
      2: 'should be a number'
    })
    expect(
      R.object().shape({
        name: R.string(),
        age: R.number()
      }).report({
        name: 'Luke Skywalker',
        age: 'unknown'
      })
    ).to.deep.equal({
      age: 'number'
    })
  })

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
    describe('oneOf', testOneOf)

  })

  describe('Helpers', testHelpers)

})
