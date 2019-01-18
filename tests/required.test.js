import { expect } from 'chai'

import required from 'src/required'
import number from 'src/number'
import validate from 'src/validate'

const tests = () => {

  it('should pass if the value is given', () => {
    const isValid = required(number)(42)
    expect(isValid).to.be.true
  })

  it('should fail if the value is given as undefined', () => {
    const isValid = required(number)(undefined)
    expect(isValid).to.be.false
  })

  it('should fail if the value is not given', () => {
    const isValid = required(number)()
    expect(isValid).to.be.false
  })

  it('should fail if the value given but doesn\'t pass validation', () => {
    const isValid = required(number)('42')
    expect(isValid).to.be.fail
  })

  it('should pass the entire validation', () => {
    const schema = { property: required(number) },
          target = { property: 42 },
          result = validate(schema)(target)
    expect(result.isValid).to.be.true
  })

  it('should fail the entire validation', () => {
    const schema = { property: required(number) },
          target = { otherProperty: 42 },
          result = validate(schema)(target)
    expect(result.isValid).to.be.false
  })

}

export default tests
