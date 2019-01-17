import { expect } from 'chai'

import required from 'src/required'
import validate from 'src/validate'

const testRequired = () => {

  it('should pass if the value is given', () => {
    const isValid = required(42)
    expect(isValid).to.be.true
  })

  it('should fail if the value is given as undefined', () => {
    const isValid = required(undefined)
    expect(isValid).to.be.false
  })

  it('should fail if the value is not given', () => {
    const isValid = required()
    expect(isValid).to.be.false
  })

  it('should pass the entire validation', () => {
    const schema = { property: required },
          target = { property: 42 },
          result = validate(schema)(target)
    expect(result.isValid).to.be.true
  })

  it('should fail the entire validation', () => {
    const schema = { property: required },
          target = { otherProperty: 42 },
          result = validate(schema)(target)
    expect(result.isValid).to.be.false
  })

}

export default testRequired
