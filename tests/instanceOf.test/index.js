import { expect } from 'chai'

import Validator from 'src/validator'
import instanceOf from 'src/instanceOf'

export default function testInstanceOf() {

  const validator = new Validator('test')
  validator.use('instanceOf', instanceOf)

  it('should be a function', () => {
    expect(instanceOf).to.be.a('function')
  })

  it('should take one parameter', () => {
    expect(instanceOf.length).to.equal(1)
  })

  it('should be enhanced with `make`', () => {
    expect(instanceOf).to.have.property('chained')
    expect(instanceOf).to.have.property('chain')
  })

  it('should throw if no compare class is provided', () => {
    const result = () => validator.instanceOf()
    expect(result).to.throw(TypeError, /must be provided/)
  })

  it('should pass if value is an instance of a "class" as the one provided', () => {
    expect(validator.instanceOf(Date).test(new Date())).to.be.true
  })

  it('should fail if value isn\'t provided', () => {
    expect(validator.instanceOf(Array).test()).to.be.false
  })

  it('should fail if value isn\'t an instance of a "class" as the one provided', () => {
    expect(validator.instanceOf(String).test(NaN)).to.be.false
    expect(validator.instanceOf(Number).test(true)).to.be.false
    expect(validator.instanceOf(Number).test(false)).to.be.false
    expect(validator.instanceOf(Array).test(42)).to.be.false
    expect(validator.instanceOf(Function).test({})).to.be.false
    expect(validator.instanceOf(Date).test(() => {})).to.be.false
    expect(validator.instanceOf(RegExp).test([])).to.be.false
    expect(validator.instanceOf(Error).test(null)).to.be.false
  })

  it('shouldn\'t report if value is an instance of a "class" as the one provided', () => {
    expect(validator.instanceOf(Date).report(new Date())).to.be.false
  })

  it('should report if value isn\'t a instanceOf', () => {
    expect(validator.instanceOf(String).report(NaN)).to.equal('instanceOf')
    expect(validator.instanceOf(Number).report(true)).to.equal('instanceOf')
    expect(validator.instanceOf(Number).report(false)).to.equal('instanceOf')
    expect(validator.instanceOf(Array).report(42)).to.equal('instanceOf')
    expect(validator.instanceOf(Function).report({})).to.equal('instanceOf')
    expect(validator.instanceOf(Date).report(() => {})).to.equal('instanceOf')
    expect(validator.instanceOf(RegExp).report([])).to.equal('instanceOf')
    expect(validator.instanceOf(Error).report(null)).to.equal('instanceOf')
  })

  it('should fallback to parent report if value isn\'t provided', () => {
    expect(validator.instanceOf(Array).report()).to.equal('required')
  })

}
