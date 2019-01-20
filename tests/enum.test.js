import { expect } from 'chai'

import _enum from 'src/enum'
import validate from 'src/validate'

const tests = () => {

  it('should pass if the value is in the given arguments list', () => {
    const isValid = _enum(1, 2, 3)(2)
    expect(isValid).to.be.true
  })

  it('should pass if the value is in the given arguments array', () => {
    const isValid = _enum([1, 2, 3])(2)
    expect(isValid).to.be.true
  })

  it('should pass if the value isn\'t in the given list', () => {
    const isValid = _enum(1, 2, 3)(42)
    expect(isValid).to.be.false
  })

  it('should pass if the value is given as undefined', () => {
    const isValid = _enum(1, 2, 3)(undefined)
    expect(isValid).to.be.true
  })

  it('should pass if the value is not given', () => {
    const isValid = _enum(1, 2, 3)()
    expect(isValid).to.be.true
  })

  it('should fail if the arguments list is empty', () => {
    const isValid = _enum()(42)
    expect(isValid).to.be.false
  })

  it('should fail if the array of values is empty', () => {
    const isValid = _enum([])(42)
    expect(isValid).to.be.false
  })

  it('should pass the entire validation', () => {
    const schema = { property: _enum('a', 'b', 'c') },
          target = { property: 'c' },
          result = validate(schema)(target)
    expect(result.isValid).to.be.true
  })

  it('should fail the entire validation', () => {
    const schema = { property: _enum('a', 'b', 'c') },
          target = { property: '42' },
          result = validate(schema)(target)
    expect(result.isValid).to.be.false
  })

}

export default tests
