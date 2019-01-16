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
          target = undefined
          result = () => validate(schema)(target)
    expect(result).to.throw()
  })

  it('should throw if the target is not given at all', () => {
    const schema = {},
          result = () => validate(schema)()
    expect(result).to.throw()
  })

  it('should pass if validation result has the right shape')

  it('should pass if schema is valid', () => {
    const schema = {},
          target = {},
          result = validate(schema)(target)
    expect(result.isValid).to.be.true
  })

  it('should pass if schema has no errors', () => {
    const schema = {},
          target = {},
          result = validate(schema)(target)
    expect(result.errors).to.be.an('array').that.is.empty
  })

}

export default testValidate
