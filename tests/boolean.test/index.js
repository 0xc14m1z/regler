import { expect } from 'chai'

import Validator from 'src/validator'
import boolean from 'src/boolean'

export default function testBoolean() {

  // this neutral validator always passes
  // and never reports anything
  // const NEUTRAL_PARENT = {
  //   test: () => true,
  //   report: () => false
  // }

  const validator = new Validator('test')
  validator.use('boolean', boolean)

  it('should be a function', () => {
    expect(boolean).to.be.a('function')
  })

  it('should take no parameters', () => {
    expect(boolean.length).to.equal(0)
  })

  it('should be enhanced with `make`', () => {
    expect(boolean).to.have.property('chained')
    expect(boolean).to.have.property('chain')
  })

  it('should pass if provided value is true', () => {
    expect(validator.boolean().test(true)).to.be.true
  })

  it('should pass if provided value is false', () => {
    expect(validator.boolean().test(false)).to.be.true
  })

  it('should pass if provided value is a Boolean', () => {
    expect(validator.boolean().test(new Boolean(true))).to.be.true
  })

  it('should fail if value isn\'t provided', () => {
    expect(validator.boolean().test()).to.be.false
  })

  it('should fail if value isn\'t a boolean', () => {
    expect(validator.boolean().test(42)).to.be.false
    expect(validator.boolean().test('42')).to.be.false
    expect(validator.boolean().test({})).to.be.false
    expect(validator.boolean().test(() => {})).to.be.false
    expect(validator.boolean().test([])).to.be.false
    expect(validator.boolean().test(null)).to.be.false
  })

  it('should have nothing to report if value is true', () => {
    expect(validator.boolean().report(true)).to.be.false
  })

  it('should have nothing to report if value is false', () => {
    expect(validator.boolean().report(false)).to.be.false
  })

  it('should have nothing to report if value is a Boolean', () => {
    expect(validator.boolean().report(new Boolean(true))).to.be.false
  })

  it('should report if value isn\'t a boolean', () => {
    expect(validator.boolean().report(42)).to.equal('boolean')
    expect(validator.boolean().report('42')).to.equal('boolean')
    expect(validator.boolean().report({})).to.equal('boolean')
    expect(validator.boolean().report(() => {})).to.equal('boolean')
    expect(validator.boolean().report([])).to.equal('boolean')
    expect(validator.boolean().report(null)).to.equal('boolean')
  })

  it('should fallback to parent report if value isn\'t provided', () => {
    expect(validator.boolean().report()).to.equal('required')
  })

}
