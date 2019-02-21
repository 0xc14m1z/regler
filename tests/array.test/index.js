import { expect } from 'chai'

import Validator from 'src/validator'
import array from 'src/array'

export default function testArray() {

  const validator = new Validator('test')
  validator.use('array', array)

  it('should be a function', () => {
    expect(array).to.be.a('function')
  })

  it('should take no parameters', () => {
    expect(array.length).to.equal(0)
  })

  it('should be enhanced with `make`', () => {
    expect(array).to.have.property('chained')
    expect(array).to.have.property('chain')
  })

  it('should pass if value is an empty array', () => {
    expect(validator.array().test([])).to.be.true
  })

  it('should pass if value is a non-empty array', () => {
    expect(validator.array().test([1, 2, 3])).to.be.true
  })

  it('should pass if value is an Array', () => {
    expect(validator.array().test(new Array(42))).to.be.true
  })

  it('should fail if value isn\'t provided', () => {
    expect(validator.array().test()).to.be.false
  })

  it('should fail if value isn\'t a array', () => {
    expect(validator.array().test(NaN)).to.be.false
    expect(validator.array().test(true)).to.be.false
    expect(validator.array().test(false)).to.be.false
    expect(validator.array().test(42)).to.be.false
    expect(validator.array().test({})).to.be.false
    expect(validator.array().test(() => {})).to.be.false
    expect(validator.array().test('[]')).to.be.false
    expect(validator.array().test(null)).to.be.false
  })

  it('shouldn\'t report if value is an empty array', () => {
    expect(validator.array().report([])).to.be.false
  })

  it('shouldn\'t report if value is a non-empty array', () => {
    expect(validator.array().report([1, 2, 3])).to.be.false
  })

  it('shouldn\'t report if value is an Array', () => {
    expect(validator.array().report(new Array(42))).to.be.false
  })

  it('should report if value isn\'t a array', () => {
    expect(validator.array().report(NaN)).to.equal('array')
    expect(validator.array().report(true)).to.equal('array')
    expect(validator.array().report(false)).to.equal('array')
    expect(validator.array().report(42)).to.equal('array')
    expect(validator.array().report({})).to.equal('array')
    expect(validator.array().report(() => {})).to.equal('array')
    expect(validator.array().report('[]')).to.equal('array')
    expect(validator.array().report(null)).to.equal('array')
  })

  it('should fallback to parent report if value isn\'t provided', () => {
    expect(validator.array().report()).to.equal('required')
  })

}
