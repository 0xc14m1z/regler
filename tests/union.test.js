import { expect } from 'chai'

import union from 'src/union'
import number from 'src/number'
import string from 'src/string'
import boolean from 'src/boolean'
import validate from 'src/validate'

const tests = () => {

  it('should pass if the value is of a type in the given arguments list', () => {
    const isValid = union(number, string, boolean)('42')
    expect(isValid).to.be.true
  })

  it('should pass if the value is of a type in the given arguments array', () => {
    const isValid = union([number, string, boolean])('42')
    expect(isValid).to.be.true
  })

  it('should pass if the value isn\'t of a type in the given list', () => {
    const isValid = union(number, boolean)('42')
    expect(isValid).to.be.false
  })

  it('should pass if the value is given as undefined', () => {
    const isValid = union(number, string, boolean)(undefined)
    expect(isValid).to.be.true
  })

  it('should pass if the value is not given', () => {
    const isValid = union(number, string, boolean)()
    expect(isValid).to.be.true
  })

  it('should fail if the arguments list is empty', () => {
    const isValid = union()(42)
    expect(isValid).to.be.false
  })

  it('should fail if the array of values is empty', () => {
    const isValid = union([])(42)
    expect(isValid).to.be.false
  })

  it('should pass the entire validation', () => {
    const schema = { property: union(number, string, boolean) },
          target = { property: 'c' },
          result = validate(schema)(target)
    expect(result.isValid).to.be.true
  })

  it('should fail the entire validation', () => {
    const schema = { property: union(number, boolean) },
          target = { property: '42' },
          result = validate(schema)(target)
    expect(result.isValid).to.be.false
  })

}

export default tests
