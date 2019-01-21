import { expect } from 'chai'

import fn from 'src/fn'
import validate from 'src/validate'

const tests = () => {

  it('should pass if the value is a lambda function', () => {
    const isValid = fn(() => {})
    expect(isValid).to.be.true
  })

  it('should pass if the value is a function', () => {
    const func = function () {}
    const isValid = fn(func)
    expect(isValid).to.be.true
  })

  it('should pass if the value is a Function instance', () => {
    const isValid = fn(new Function())
    expect(isValid).to.be.true
  })

  it('should pass if the value is given as undefined', () => {
    const isValid = fn(undefined)
    expect(isValid).to.be.true
  })

  it('should pass if the value is not given', () => {
    const isValid = fn()
    expect(isValid).to.be.true
  })

  it('should fail if the value is NaN', () => {
    const isValid = fn(NaN)
    expect(isValid).to.be.false
  })

  it('should fail if the value is a string', () => {
    const isValid = fn("42")
    expect(isValid).to.be.false
  })

  it('should fail if the value is a boolean', () => {
    const isValid = fn(true)
    expect(isValid).to.be.false
  })

  it('should fail if the value is a generic object', () => {
    const isValid = fn({})
    expect(isValid).to.be.false
  })

  it('should fail if the value is a number', () => {
    const isValid = fn(42)
    expect(isValid).to.be.false
  })

  it('should fail if the value is an array', () => {
    const isValid = fn([])
    expect(isValid).to.be.false
  })

  it('should pass the entire validation', () => {
    const schema = { property: fn },
          target = { property: () => {} },
          result = validate(schema)(target)
    expect(result.isValid).to.be.true
  })

  it('should fail the entire validation', () => {
    const schema = { property: fn },
          target = { property: '42' },
          result = validate(schema)(target)
    expect(result.isValid).to.be.false
  })

  describe('chained', () => {

    it('should have #required enhancer chained', () => {
      const isValid = fn.required()
      expect(isValid).to.be.false
    })

  })

}

export default tests
