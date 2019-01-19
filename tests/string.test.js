import { expect } from 'chai'

import string from 'src/string'
import validate from 'src/validate'

const tests = () => {

  it('should pass if the value is an empty string', () => {
    const isValid = string('')
    expect(isValid).to.be.true
  })

  it('should pass if the value is a string', () => {
    const isValid = string('string')
    expect(isValid).to.be.true
  })

  it('should pass if the value is a String instance', () => {
    const isValid = string(new String('string'))
    expect(isValid).to.be.true
  })

  it('should fail if the value is given as undefined', () => {
    const isValid = string(undefined)
    expect(isValid).to.be.false
  })

  it('should fail if the value is not given', () => {
    const isValid = string()
    expect(isValid).to.be.false
  })

  it('should fail if the value is NaN', () => {
    const isValid = string(NaN)
    expect(isValid).to.be.false
  })

  it('should fail if the value is a boolean', () => {
    const isValid = string(true)
    expect(isValid).to.be.false
  })

  it('should fail if the value is an array', () => {
    const isValid = string([])
    expect(isValid).to.be.false
  })

  it('should fail if the value is a generic object', () => {
    const isValid = string({})
    expect(isValid).to.be.false
  })

  it('should fail if the value is a number', () => {
    const isValid = string(42)
    expect(isValid).to.be.false
  })

  it('should fail if the value is a function', () => {
    const isValid = string(() => 42)
    expect(isValid).to.be.false
  })

  it('should pass the entire validation', () => {
    const schema = { property: string },
          target = { property: 'string' },
          result = validate(schema)(target)
    expect(result.isValid).to.be.true
  })

  it('should fail the entire validation', () => {
    const schema = { property: string },
          target = { property: 42 },
          result = validate(schema)(target)
    expect(result.isValid).to.be.false
  })

}

export default tests
