import { expect } from 'chai'

import Validator from 'src/validator'

export default function testTest() {

  it('should be a function', () => {
    const validator = new Validator('root')
    expect(validator.test).to.be.a('function')
  })

  it('should take one parameter', () => {
    const validator = new Validator('root')
    expect(validator.test.length).to.equal(1)
  })

  it('should pass if value is provided', () => {
    const validator = new Validator('root')
    expect(validator.test(123)).to.be.true
  })

  it('should fail if value isn\'t provided', () => {
    const validator = new Validator('root')
    expect(validator.test()).to.be.false
  })

}
