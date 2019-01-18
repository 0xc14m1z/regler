import { expect } from 'chai'

import number from 'src/number'
import validate from 'src/validate'

const tests = () => {

  it('should pass if the value is an integer', () => {
    const isValid = number(42)
    expect(isValid).to.be.true
  })

  it('should pass if the value is a float', () => {
    const isValid = number(4.2)
    expect(isValid).to.be.true
  })

  it('should pass if the value is zero', () => {
    const isValid = number(0)
    expect(isValid).to.be.true
  })

  it('should pass if the value is positive infinity', () => {
    const isValid = number(Number.POSITIVE_INFINITY)
    expect(isValid).to.be.true
  })

  it('should pass if the value is negative infinity', () => {
    const isValid = number(Number.NEGATIVE_INFINITY)
    expect(isValid).to.be.true
  })

  it('should pass if the value is a Number instance', () => {
    const isValid = number(new Number(42))
    expect(isValid).to.be.true
  })

  it('should fail if the value is given as undefined', () => {
    const isValid = number(undefined)
    expect(isValid).to.be.fail
  })

  it('should fail if the value is not given', () => {
    const isValid = number()
    expect(isValid).to.be.fail
  })

  it('should fail if the value is NaN', () => {
    const isValid = number(NaN)
    expect(isValid).to.be.false
  })

  it('should fail if the value is a string', () => {
    const isValid = number("42")
    expect(isValid).to.be.false
  })

  it('should fail if the value is an array', () => {
    const isValid = number([])
    expect(isValid).to.be.false
  })

  it('should fail if the value is a generic object', () => {
    const isValid = number({})
    expect(isValid).to.be.false
  })

  it('should fail if the value is a boolean', () => {
    const isValid = number(true)
    expect(isValid).to.be.false
  })

  it('should fail if the value is a function', () => {
    const isValid = number(() => 42)
    expect(isValid).to.be.false
  })

  it('should pass the entire validation', () => {
    const schema = { property: number },
          target = { property: 42 },
          result = validate(schema)(target)
    expect(result.isValid).to.be.true
  })

  it('should fail the entire validation', () => {
    const schema = { property: number },
          target = { property: '42' },
          result = validate(schema)(target)
    expect(result.isValid).to.be.false
  })

}

export default tests
