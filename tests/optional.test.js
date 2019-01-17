import { expect } from 'chai'

import optional from 'src/optional'

const testOptional = () => {

  it('should pass if the value is given', () => {
    const isValid = optional(42)
    expect(isValid).to.be.true
  })

  it('should pass if the value is given as undefined', () => {
    const isValid = optional(undefined)
    expect(isValid).to.be.true
  })

  it('should pass if the value is not given', () => {
    const isValid = optional()
    expect(isValid).to.be.true
  })

}

export default testOptional
