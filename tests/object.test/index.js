import { expect } from 'chai'

import Validator from 'src/validator'
import object from 'src/object'

import testShape from './shape.test'

export default function testObject() {

  const validator = new Validator('test')
  validator.use('object', object)

  it('should be a function', () => {
    expect(object).to.be.a('function')
  })

  it('should take no parameters', () => {
    expect(object.length).to.equal(0)
  })

  it('should be enhanced with `make`', () => {
    expect(object).to.have.property('chained')
    expect(object).to.have.property('chain')
  })

  it('should pass if value is an empty object', () => {
    expect(validator.object().test({})).to.be.true
  })

  it('should pass if value is a non-empty object', () => {
    expect(validator.object().test({ p1: 4, p2: 2 })).to.be.true
  })

  it('should pass if value is an Object', () => {
    expect(validator.object().test(new Object())).to.be.true
  })

  it('should fail if value isn\'t provided', () => {
    expect(validator.object().test()).to.be.false
  })

  it('should fail if value isn\'t a object', () => {
    expect(validator.object().test(NaN)).to.be.false
    expect(validator.object().test(true)).to.be.false
    expect(validator.object().test(false)).to.be.false
    expect(validator.object().test(42)).to.be.false
    expect(validator.object().test('string')).to.be.false
    expect(validator.object().test(() => {})).to.be.false
    expect(validator.object().test([])).to.be.false
    expect(validator.object().test(null)).to.be.false
  })

  it('shouldn\'t report if value is an empty object', () => {
    expect(validator.object().report({})).to.be.false
  })

  it('shouldn\'t report if value is a non-empty object', () => {
    expect(validator.object().report({ p1: 4, p2: 2 })).to.be.false
  })

  it('shouldn\'t report if value is an Object', () => {
    expect(validator.object().report(new Object())).to.be.false
  })

  it('should report if value isn\'t a object', () => {
    expect(validator.object().report(NaN)).to.equal('object')
    expect(validator.object().report(true)).to.equal('object')
    expect(validator.object().report(false)).to.equal('object')
    expect(validator.object().report(42)).to.equal('object')
    expect(validator.object().report('string')).to.equal('object')
    expect(validator.object().report(() => {})).to.equal('object')
    expect(validator.object().report([])).to.equal('object')
    expect(validator.object().report(null)).to.equal('object')
  })

  it('should fallback to parent report if value isn\'t provided', () => {
    expect(validator.object().report()).to.equal('required')
  })

  describe('shape', testShape)

}
