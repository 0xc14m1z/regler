import { expect } from 'chai'

import object from 'src/object'
import shape from 'src/object/shape'
import exact from 'src/object/shape/exact'
import string from 'src/string'
import number from 'src/number'
import validate from 'src/validate'

const tests = () => {

  const schema = {
    name: string,
    age: number
  }

  it('should pass if the object has the exact given schema shape', () => {
    const value = { name: 'Luke Skywalker', age: 42 }
    const isValid = object.shape(schema).exact(value)
    expect(isValid).to.be.true
  })

  it('should fail if the object hasn\'t the exact given schema shape', () => {
    const value = { name: 42, age: 'Luke Skywalker' }
    const isValid = object.shape(schema).exact(value)
    expect(isValid).to.be.false
  })

  it('should fail if the value is NaN', () => {
    const isValid = object.shape(schema).exact(NaN)
    expect(isValid).to.be.false
  })

  it('should fail if the value is a string', () => {
    const isValid = object.shape(schema).exact("42")
    expect(isValid).to.be.false
  })

  it('should fail if the value is a boolean', () => {
    const isValid = object.shape(schema).exact(true)
    expect(isValid).to.be.false
  })

  it('should fail if the value is a function', () => {
    const isValid = object.shape(schema).exact(() => {})
    expect(isValid).to.be.false
  })

  it('should fail if the value is a number', () => {
    const isValid = object.shape(schema).exact(42)
    expect(isValid).to.be.false
  })

  it('should fail if the value is an array', () => {
    const isValid = object.shape(schema).exact([])
    expect(isValid).to.be.false
  })

  it('should pass the entire validation', () => {
    const outerSchema = { property: object.shape(schema).exact },
          target = { property: { name: 'Luke Skywalker', age: 42 } },
          result = validate(outerSchema)(target)
    expect(result.isValid).to.be.true
  })

  it('should fail the entire validation', () => {
    const outerSchema = { property: object.shape(schema).exact },
          target = { property: { name: 'Luke Skywalker' } },
          result = validate(outerSchema)(target)
    expect(result.isValid).to.be.false
  })

  describe('chained', () => {

    it('should have #required enhancer chained', () => {
      const isValid = object.shape(schema).exact.required()
      expect(isValid).to.be.false
    })

  })

}

export default tests
