import { expect } from 'chai'

import optional from 'src/optional'
import number from 'src/number'

const tests = () => {

  it('should pass if the value is given', () => {
    const isValid = optional(number)(42)
    expect(isValid).to.be.true
  })

  it('should pass if the value is given as undefined', () => {
    const isValid = optional(number)(undefined)
    expect(isValid).to.be.true
  })

  it('should pass if the value is not given', () => {
    const isValid = optional(number)()
    expect(isValid).to.be.true
  })

  it('should fail if the value given but doesn\'t pass validation', () => {
    const isValid = optional(number)('42')
    expect(isValid).to.be.fail
  })

}

export default tests
