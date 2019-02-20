import { expect } from 'chai'

import Validator from 'src/validator'
import required from 'src/required'

export default function testRequired() {

  // this neutral validator always passes
  // and never reports anything
  const NEUTRAL_PARENT = {
    test: () => true,
    report: () => false
  }

  const validator = new Validator('test', NEUTRAL_PARENT)
  validator.use('required', required)

  it('should be a function', () => {
    expect(required).to.be.a('function')
  })

  it('should take no parameters', () => {
    expect(required.length).to.equal(0)
  })

  it('should be enhanced with `make`', () => {
    expect(required).to.have.property('chained')
    expect(required).to.have.property('chain')
  })

  it('should pass if value is provided', () => {
    expect(validator.required().test(123)).to.be.true
  })

  it('should fail if value isn\'t provided', () => {
    expect(validator.required().test()).to.be.false
  })

  it('should have nothing to report if value is provided', () => {
    expect(validator.required().report(123)).to.be.false
  })

  it('should have to report if value isn\'t provided', () => {
    expect(validator.required().report()).to.equal('required')
  })

}
