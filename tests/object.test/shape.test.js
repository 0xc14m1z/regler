import { expect } from 'chai'

import shape from 'src/object/shape'
import string from 'src/string'
import number from 'src/number'
import validate from 'src/validate'

const tests = () => {

  const schema = {
    name: string,
    age: number
  }

  it('should throw if the schema is undefined', () => {
    const result = () => shape(undefined)
    expect(result).to.throw()
  })

  it('should throw if the schema is not given at all', () => {
    const result = () => shape()
    expect(result).to.throw()
  })

  it('should pass if the object has the given schema shape', () => {
    const value = { name: 'Luke Skywalker', age: 42 }
    const isValid = shape(schema)(value)
    expect(isValid).to.be.true
  })

  it('should fail if the object hasn\' the given schema shape', () => {
    const value = { name: 42, age: 'Luke Skywalker' }
    const isValid = shape(schema)(value)
    expect(isValid).to.be.false
  })

  it('should fail if the value is NaN', () => {
    const isValid = shape(schema)(NaN)
    expect(isValid).to.be.false
  })

  it('should fail if the value is a string', () => {
    const isValid = shape(schema)("42")
    expect(isValid).to.be.false
  })

  it('should fail if the value is a boolean', () => {
    const isValid = shape(schema)(true)
    expect(isValid).to.be.false
  })

  it('should fail if the value is a function', () => {
    const isValid = shape(schema)(() => {})
    expect(isValid).to.be.false
  })

  it('should fail if the value is a number', () => {
    const isValid = shape(schema)(42)
    expect(isValid).to.be.false
  })

  it('should fail if the value is an array', () => {
    const isValid = shape(schema)([])
    expect(isValid).to.be.false
  })

  it('should pass the entire validation', () => {
    const outerSchema = { property: shape(schema) },
          target = { property: { name: 'Luke Skywalker', age: 42 } },
          result = validate(outerSchema)(target)
    expect(result.isValid).to.be.true
  })

  it('should fail the entire validation', () => {
    const outerSchema = { property: shape(schema) },
          target = { property: '42' },
          result = validate(outerSchema)(target)
    expect(result.isValid).to.be.false
  })

}

export default tests
