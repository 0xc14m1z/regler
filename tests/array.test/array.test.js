import { expect } from 'chai'

import array from 'src/array'
import number from 'src/number'
import validate from 'src/validate'

const tests = () => {

  it('should pass if the value is an empty array', () => {
    const isValid = array([])
    expect(isValid).to.be.true
  })

  it('should pass if the value is a non-empty array', () => {
    const isValid = array([1, 2, 3])
    expect(isValid).to.be.true
  })

  it('should pass if the value is an Array instance', () => {
    const isValid = array(new Array(1, 2, 3))
    expect(isValid).to.be.true
  })

  it('should pass if the value is given as undefined', () => {
    const isValid = array(undefined)
    expect(isValid).to.be.true
  })

  it('should pass if the value is not given', () => {
    const isValid = array()
    expect(isValid).to.be.true
  })

  it('should fail if the value is NaN', () => {
    const isValid = array(NaN)
    expect(isValid).to.be.false
  })

  it('should fail if the value is a string', () => {
    const isValid = array("42")
    expect(isValid).to.be.false
  })

  it('should fail if the value is a boolean', () => {
    const isValid = array(true)
    expect(isValid).to.be.false
  })

  it('should fail if the value is a generic object', () => {
    const isValid = array({})
    expect(isValid).to.be.false
  })

  it('should fail if the value is a number', () => {
    const isValid = array(42)
    expect(isValid).to.be.false
  })

  it('should fail if the value is a function', () => {
    const isValid = array(() => 42)
    expect(isValid).to.be.false
  })

  it('should pass the entire validation', () => {
    const schema = { property: array },
          target = { property: [1, 2, 3] },
          result = validate(schema)(target)
    expect(result.isValid).to.be.true
  })

  it('should fail the entire validation', () => {
    const schema = { property: array },
          target = { property: '42' },
          result = validate(schema)(target)
    expect(result.isValid).to.be.false
  })

  describe('chained', () => {

    it('should have #required enhancer chained', () => {
      const isValid = array.required()
      expect(isValid).to.be.false
    })

    it('should have #of enhancer chained', () => {
      const isValid = array.of(number)(['a', 'b', 'c'])
      expect(isValid).to.be.false
    })

  })

}

export default tests
