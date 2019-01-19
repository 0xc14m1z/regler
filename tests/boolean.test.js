import { expect } from 'chai'

import boolean from 'src/boolean'
import validate from 'src/validate'

const tests = () => {

  it('should pass if the value is true', () => {
    const isValid = boolean(true)
    expect(isValid).to.be.true
  })

  it('should pass if the value is false', () => {
    const isValid = boolean(false)
    expect(isValid).to.be.true
  })

  it('should pass if the value is a Boolean instance', () => {
    const isValid = boolean(new Boolean(true))
    expect(isValid).to.be.true
  })

  it('should fail if the value is given as undefined', () => {
    const isValid = boolean(undefined)
    expect(isValid).to.be.false
  })

  it('should fail if the value is not given', () => {
    const isValid = boolean()
    expect(isValid).to.be.false
  })

  it('should fail if the value is NaN', () => {
    const isValid = boolean(NaN)
    expect(isValid).to.be.false
  })

  it('should fail if the value is a string', () => {
    const isValid = boolean("42")
    expect(isValid).to.be.false
  })

  it('should fail if the value is an array', () => {
    const isValid = boolean([])
    expect(isValid).to.be.false
  })

  it('should fail if the value is a generic object', () => {
    const isValid = boolean({})
    expect(isValid).to.be.false
  })

  it('should fail if the value is a number', () => {
    const isValid = boolean(42)
    expect(isValid).to.be.false
  })

  it('should fail if the value is a function', () => {
    const isValid = boolean(() => 42)
    expect(isValid).to.be.false
  })

  it('should pass the entire validation', () => {
    const schema = { property: boolean },
          target = { property: true },
          result = validate(schema)(target)
    expect(result.isValid).to.be.true
  })

  it('should fail the entire validation', () => {
    const schema = { property: boolean },
          target = { property: '42' },
          result = validate(schema)(target)
    expect(result.isValid).to.be.false
  })

}

export default tests
