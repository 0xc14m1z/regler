import { expect } from 'chai'

import Validator from 'src/validator'
import fn from 'src/function'

export default function testFunction() {

  const validator = new Validator('test')
  validator.use('function', fn)

  it('should be a function', () => {
    expect(fn).to.be.a('function')
  })

  it('should take no parameters', () => {
    expect(fn.length).to.equal(0)
  })

  it('should be enhanced with `make`', () => {
    expect(fn).to.have.property('chained')
    expect(fn).to.have.property('chain')
  })

  it('should pass if value is a standard function', () => {
    expect(validator.function().test(function () {})).to.be.true
  })

  it('should pass if value is an arrow function', () => {
    expect(validator.function().test(() => {})).to.be.true
  })

  it('should pass if value is a Function', () => {
    expect(validator.function().test(new Function())).to.be.true
  })

  it('should fail if value isn\'t provided', () => {
    expect(validator.function().test()).to.be.false
  })

  it('should fail if value isn\'t a function', () => {
    expect(validator.function().test(NaN)).to.be.false
    expect(validator.function().test(true)).to.be.false
    expect(validator.function().test(false)).to.be.false
    expect(validator.function().test(42)).to.be.false
    expect(validator.function().test({})).to.be.false
    expect(validator.function().test('42')).to.be.false
    expect(validator.function().test([])).to.be.false
    expect(validator.function().test(null)).to.be.false
  })

  it('shouldn\'t report if value is a standard function', () => {
    expect(validator.function().report(function () {})).to.be.false
  })

  it('shouldn\'t report if value is an arrow function', () => {
    expect(validator.function().report(() => {})).to.be.false
  })

  it('shouldn\'t report if value is a Function', () => {
    expect(validator.function().report(new Function())).to.be.false
  })

  it('should report if value isn\'t a function', () => {
    expect(validator.function().report(NaN)).to.equal('function')
    expect(validator.function().report(true)).to.equal('function')
    expect(validator.function().report(false)).to.equal('function')
    expect(validator.function().report(42)).to.equal('function')
    expect(validator.function().report({})).to.equal('function')
    expect(validator.function().report('42')).to.equal('function')
    expect(validator.function().report([])).to.equal('function')
    expect(validator.function().report(null)).to.equal('function')
  })

  it('should fallback to parent report if value isn\'t provided', () => {
    expect(validator.function().report()).to.equal('required')
  })

}
