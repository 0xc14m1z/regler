import { expect } from 'chai'

import object from 'src/object'
import validate from 'src/validate'

const tests = () => {

  it('should pass if the value is a POJO', () => {
    const isValid = object({})
    expect(isValid).to.be.true
  })

  it('should pass if the value is an instance of Object', () => {
    const isValid = object(new Object())
    expect(isValid).to.be.true
  })

  it('should pass if the value is given as undefined', () => {
    const isValid = object(undefined)
    expect(isValid).to.be.true
  })

  it('should pass if the value is not given', () => {
    const isValid = object()
    expect(isValid).to.be.true
  })

  it('should fail if the value is NaN', () => {
    const isValid = object(NaN)
    expect(isValid).to.be.false
  })

  it('should fail if the value is a string', () => {
    const isValid = object("42")
    expect(isValid).to.be.false
  })

  it('should fail if the value is a boolean', () => {
    const isValid = object(true)
    expect(isValid).to.be.false
  })

  it('should fail if the value is a function', () => {
    const isValid = object(() => {})
    expect(isValid).to.be.false
  })

  it('should fail if the value is a number', () => {
    const isValid = object(42)
    expect(isValid).to.be.false
  })

  it('should fail if the value is an array', () => {
    const isValid = object([])
    expect(isValid).to.be.false
  })

  it('should pass the entire validation', () => {
    const schema = { property: object },
          target = { property: {} },
          result = validate(schema)(target)
    expect(result.isValid).to.be.true
  })

  it('should fail the entire validation', () => {
    const schema = { property: object },
          target = { property: '42' },
          result = validate(schema)(target)
    expect(result.isValid).to.be.false
  })

  describe('chained', () => {

    it('should have #required enhancer chained', () => {
      const isValid = object.required()
      expect(isValid).to.be.false
    })

    it('should have #shape enhancer chained', () => {
      const target = { property: {} }
      const isValid = object.shape({ property: object })(target)
      expect(isValid).to.be.true
    })

  })

}

export default tests
