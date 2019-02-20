import { expect } from 'chai'

import Validator from 'src/validator'

export default function testReport() {

  it('should be a function', () => {
    const validator = new Validator('root')
    expect(validator.report).to.be.a('function')
  })

  it('should take one parameter', () => {
    const validator = new Validator('root')
    expect(validator.report.length).to.equal(1)
  })

  it('should return false if value is provided', () => {
    const validator = new Validator('root')
    expect(validator.report(123)).to.be.false
  })

  it('should return \'required\' if value isn\'t provided', () => {
    const validator = new Validator('root')
    expect(validator.report()).to.equal('required')
  })

  it('should return inner feedback if parent returns false', () => {
    const parent = { test: () => false, report: () => false }
    const validator = new Validator('root', parent, 'custom feedback')
    expect(validator.report()).to.equal('custom feedback')
  })

}
