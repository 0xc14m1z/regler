import { expect } from 'chai'

import Validator from 'src/validator'
import number from 'src/number'

export default function testNumber() {

  const validator = new Validator('test')
  validator.use('number', number)

  it('should be a function', () => {
    expect(number).to.be.a('function')
  })

  it('should take no parameters', () => {
    expect(number.length).to.equal(0)
  })

  it('should be enhanced with `make`', () => {
    expect(number).to.have.property('chained')
    expect(number).to.have.property('chain')
  })

  it('should pass if value is zero', () => {
    expect(validator.number().test(0)).to.be.true
  })

  it('should pass if value is an integer', () => {
    expect(validator.number().test(42)).to.be.true
  })

  it('should pass if value is a float', () => {
    expect(validator.number().test(4.2)).to.be.true
  })

  it('should pass if value is a Number', () => {
    expect(validator.number().test(new Number(42))).to.be.true
  })

  it('should fail if value isn\'t provided', () => {
    expect(validator.number().test()).to.be.false
  })

  it('should fail if value isn\'t a number', () => {
    expect(validator.number().test(NaN)).to.be.false
    expect(validator.number().test(true)).to.be.false
    expect(validator.number().test(false)).to.be.false
    expect(validator.number().test('42')).to.be.false
    expect(validator.number().test({})).to.be.false
    expect(validator.number().test(() => {})).to.be.false
    expect(validator.number().test([])).to.be.false
    expect(validator.number().test(null)).to.be.false
  })

  it('shouldn\'t report if value is zero', () => {
    expect(validator.number().report(0)).to.be.false
  })

  it('shouldn\'t report if value is an integer', () => {
    expect(validator.number().report(42)).to.be.false
  })

  it('shouldn\'t report if value is a float', () => {
    expect(validator.number().report(4.2)).to.be.false
  })

  it('shouldn\'t report if value is a Number', () => {
    expect(validator.number().report(new Number(42))).to.be.false
  })

  it('should report if value isn\'t a number', () => {
    expect(validator.number().report(NaN)).to.equal('number')
    expect(validator.number().report(true)).to.equal('number')
    expect(validator.number().report(false)).to.equal('number')
    expect(validator.number().report('42')).to.equal('number')
    expect(validator.number().report({})).to.equal('number')
    expect(validator.number().report(() => {})).to.equal('number')
    expect(validator.number().report([])).to.equal('number')
    expect(validator.number().report(null)).to.equal('number')
  })

  it('should fallback to parent report if value isn\'t provided', () => {
    expect(validator.number().report()).to.equal('required')
  })

}
