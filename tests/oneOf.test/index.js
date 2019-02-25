import { expect } from 'chai'

import Validator from 'src/validator'
import oneOf from 'src/oneOf'

export default function testOneOf() {

  const validator = new Validator('test')
  validator.use('oneOf', oneOf)

  it('should be a function', () => {
    expect(oneOf).to.be.a('function')
  })

  it('should take one parameter', () => {
    expect(oneOf.length).to.equal(1)
  })

  it('should be enhanced with `make`', () => {
    expect(oneOf).to.have.property('chained')
    expect(oneOf).to.have.property('chain')
  })

  it('should throw if accepted values array isn\'t provided', () => {
    const result = () => validator.oneOf()
    expect(result).to.throw(TypeError, /must be provided/)
  })

  it('should throw if acceptable values array is empty', () => {
    const result = () => validator.oneOf([])
    expect(result).to.throw(TypeError, /must not be empty/)
  })

  it('shouldn\'t throw if acceptable values array is provided', () => {
    const result = () => validator.oneOf([1, 2, 3])
    expect(result).not.to.throw()
  })

  it('should throw if the acceptable values list isn\'t an array', () => {
    expect(() => validator.oneOf(NaN)).to.throw(TypeError, /must be an array/)
    expect(() => validator.oneOf(true)).to.throw(TypeError, /must be an array/)
    expect(() => validator.oneOf(false)).to.throw(TypeError, /must be an array/)
    expect(() => validator.oneOf(42)).to.throw(TypeError, /must be an array/)
    expect(() => validator.oneOf('string')).to.throw(TypeError, /must be an array/)
    expect(() => validator.oneOf(() => {})).to.throw(TypeError, /must be an array/)
    expect(() => validator.oneOf(null)).to.throw(TypeError, /must be an array/)
    expect(() => validator.oneOf({})).to.throw(TypeError, /must be an array/)
  })

  it('should pass if value is in the list provided', () => {
    expect(validator.oneOf([1, 2, 3]).test(2)).to.be.true
  })

  it('should fail if value isn\'t in the list provided', () => {
    expect(validator.oneOf(['a', 'b', 'c']).test(42)).to.be.false
  })

  it('shouldn\'t report if value is in the list provided', () => {
    expect(validator.oneOf([1, 2, 3]).report(2)).to.be.false
  })

  it('should report if value isn\'t in the list provided', () => {
    expect(validator.oneOf(['a', 'b', 'c']).report(42)).to.equal('oneOf')
  })

  it('should fallback to parent report if value isn\'t provided', () => {
    expect(validator.oneOf([1, 2, 3]).report()).to.equal('required')
  })

}
