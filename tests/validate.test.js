import { expect } from 'chai'

import validate from 'src/validate'

const testValidate = () => {

  it('should throw if schema is undefined', () => {
    const schema = undefined,
          result = () => validate(schema)
    expect(result).to.throw()
  })

  it('should throw if schema is not given at all', () => {
    const result = () => validate()
    expect(result).to.throw()
  })

  it('should throw if the target is undefined', () => {
    const schema = {},
          target = undefined,
          result = () => validate(schema)(target)
    expect(result).to.throw()
  })

  it('should throw if the target is not given at all', () => {
    const schema = {},
          result = () => validate(schema)()
    expect(result).to.throw()
  })

  it('should pass if validation result has the right shape', () => {
    const schema = {},
          target = {},
          result = validate(schema)(target)
    expect(result).to.be.an('object').that.has.all.keys('isValid', 'errors')
  })

  it('should fail if target is an empty object', () => {
    const schema = {},
          target = {},
          result = validate(schema)(target)
    expect(result.isValid).to.be.false
    expect(result.errors).to.be.an('array').that.is.empty
  })

  it('should pass if schema is valid and has no errors', () => {
    const validator = () => ({ isValid: true, errors: [] })
    const schema = { prop: validator },
          target = { prop: 1 },
          result = validate(schema)(target)
    expect(result.isValid).to.be.true
    expect(result.errors).to.be.an('array').that.is.empty
  })

}

export default testValidate
