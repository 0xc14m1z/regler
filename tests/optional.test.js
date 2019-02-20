import { expect } from 'chai'

import Validator from 'src/validator'
import optional from 'src/optional'

export default function testOptional() {

  // this neutral validator always passes
  // and never reports anything
  const NEUTRAL_PARENT = {
    test: () => true,
    report: () => false
  }

  const validator = new Validator('test', NEUTRAL_PARENT),
        number = Validator.make(function () {
          this.test = function (value) {
            return typeof value === 'number'
          }

          this.report = function (value) {
            if (this.test(value)) return false
            return this.parent.report(value) || this.feedback
          }

          return this
        })

  number.chain('optional', optional)

  validator.use('optional', optional)
  validator.use('number', number)

  it('should be a function', () => {
    expect(optional).to.be.a('function')
  })

  it('should take no parameters', () => {
    expect(optional.length).to.equal(0)
  })

  it('should be enhanced with `make`', () => {
    expect(optional).to.have.property('chained')
    expect(optional).to.have.property('chain')
  })

  it('should pass if value is provided', () => {
    expect(validator.optional().test(123)).to.be.true
  })

  it('should pass if value isn\'t provided', () => {
    expect(validator.optional().test()).to.be.true
  })

  it('should have nothing to report if value is provided', () => {
    expect(validator.optional().report(123)).to.be.false
  })

  it('should have nothing to report if value isn\'t provided', () => {
    expect(validator.optional().report()).to.be.false
  })

  it('should pass if value is provided and pass parent tests', () => {
    expect(validator.number().optional().test(123)).to.be.true
  })

  it('should fail if value is provided but doesn\'t pass parent tests', () => {
    expect(validator.number().optional().test('123')).to.be.false
  })

  it('should have nothing to report if value is provided and pass parent tests', () => {
    expect(validator.number().optional().report(123)).to.be.false
  })

  it('should report if value is provided but doesn\'t pass parent tests', () => {
    expect(validator.number().optional().report('123')).to.equal('number')
  })

}
