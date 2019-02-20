import { expect } from 'chai'

import Validator from 'src/validator'
import string from 'src/string'

export default function testString() {

  const validator = new Validator('test')
  validator.use('string', string)

  it('should be a function', () => {
    expect(string).to.be.a('function')
  })

  it('should take no parameters', () => {
    expect(string.length).to.equal(0)
  })

  it('should be enhanced with `make`', () => {
    expect(string).to.have.property('chained')
    expect(string).to.have.property('chain')
  })

  it('should pass if value is an empty string', () => {
    expect(validator.string().test('')).to.be.true
  })

  it('should pass if value is a non-empty string', () => {
    expect(validator.string().test('non empty string')).to.be.true
  })

  it('should pass if value is a String', () => {
    expect(validator.string().test(new String('new string'))).to.be.true
  })

  it('should fail if value isn\'t provided', () => {
    expect(validator.string().test()).to.be.false
  })

  it('should fail if value isn\'t a string', () => {
    expect(validator.string().test(NaN)).to.be.false
    expect(validator.string().test(true)).to.be.false
    expect(validator.string().test(false)).to.be.false
    expect(validator.string().test(42)).to.be.false
    expect(validator.string().test({})).to.be.false
    expect(validator.string().test(() => {})).to.be.false
    expect(validator.string().test([])).to.be.false
    expect(validator.string().test(null)).to.be.false
  })

  it('shouldn\'t report if value is an empty string', () => {
    expect(validator.string().report('string')).to.be.false
  })

  it('shouldn\'t report if value is a non-empty string', () => {
    expect(validator.string().report('non empty string')).to.be.false
  })

  it('shouldn\'t report if value is a String', () => {
    expect(validator.string().report(new String('new string'))).to.be.false
  })

  it('should report if value isn\'t a string', () => {
    expect(validator.string().report(NaN)).to.equal('string')
    expect(validator.string().report(true)).to.equal('string')
    expect(validator.string().report(false)).to.equal('string')
    expect(validator.string().report(42)).to.equal('string')
    expect(validator.string().report({})).to.equal('string')
    expect(validator.string().report(() => {})).to.equal('string')
    expect(validator.string().report([])).to.equal('string')
    expect(validator.string().report(null)).to.equal('string')
  })

  it('should fallback to parent report if value isn\'t provided', () => {
    expect(validator.string().report()).to.equal('required')
  })

}
