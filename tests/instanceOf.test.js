import { expect } from 'chai'

import instanceOf from 'src/instanceOf'
import validate from 'src/validate'

const tests = () => {

  it('should throw if the class is undefined', () => {
    const result = () => instanceOf(undefined)
    expect(result).to.throw()
  })

  it('should throw if the class is not given at all', () => {
    const result = () => instanceOf()
    expect(result).to.throw()
  })

  it('should pass if the value is an instance of the given class', () => {
    const isValid = instanceOf(Date)(new Date())
    expect(isValid).to.be.true
  })

  it('should pass if the value is an instance of a custom class', () => {
    const CustomClass = class {}
    const isValid = instanceOf(CustomClass)(new CustomClass())
    expect(isValid).to.be.true
  })

  it('should pass if the value is given as undefined', () => {
    const isValid = instanceOf(Object)(undefined)
    expect(isValid).to.be.true
  })

  it('should pass if the value is not given', () => {
    const isValid = instanceOf(Number)()
    expect(isValid).to.be.true
  })

  it('should fail if the value is NaN', () => {
    const isValid = instanceOf(String)(NaN)
    expect(isValid).to.be.false
  })

  it('should fail if the value is a primitive', () => {
    const isValid = instanceOf(Number)(42)
    expect(isValid).to.be.false
  })

  it('should fail if the value is an instance of a different class', () => {
    const isValid = instanceOf(String)(42)
    expect(isValid).to.be.false
  })

  it('should pass the entire validation', () => {
    const schema = { property: instanceOf(Array) },
          target = { property: [1, 2, 3] },
          result = validate(schema)(target)
    expect(result.isValid).to.be.true
  })

  it('should fail the entire validation', () => {
    const schema = { property: instanceOf(Number) },
          target = { property: '42' },
          result = validate(schema)(target)
    expect(result.isValid).to.be.false
  })

  describe('chained', () => {

    it('should have #required enhancer chained', () => {
      const isValid = instanceOf(Number).required()
      expect(isValid).to.be.false
    })

  })

}

export default tests
