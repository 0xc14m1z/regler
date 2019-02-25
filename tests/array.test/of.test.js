import { expect } from 'chai'

import Validator from 'src/validator'
import array from 'src/array'
import number from 'src/number'
import arrayOf from 'src/array/of'

export default function testOf() {

  const validator = new Validator('test')
  validator.use('array', array)
  validator.use('number', number)
  array.chain('of', arrayOf)

  const correct = [1, 2, 3, 4]
  const incorrect = [1, '2', '3', 4]

  it('should be a function', () => {
    expect(arrayOf).to.be.a('function')
  })

  it('should take one parameter', () => {
    expect(arrayOf.length).to.equal(1)
  })

  it('should be enhanced with `make`', () => {
    expect(arrayOf).to.have.property('chained')
    expect(arrayOf).to.have.property('chain')
  })

  it('should throw if no type validator is provided', () => {
    const result = () => validator.array().of()
    expect(result).to.throw(TypeError, /must be provided/)
  })

  it('should throw if the type validator provided isn\'t a proper object', () => {
    expect(() => validator.array().of(NaN)).to.throw(TypeError, /must be an object with/)
    expect(() => validator.array().of(true)).to.throw(TypeError, /must be an object with/)
    expect(() => validator.array().of(false)).to.throw(TypeError, /must be an object with/)
    expect(() => validator.array().of(42)).to.throw(TypeError, /must be an object with/)
    expect(() => validator.array().of('string')).to.throw(TypeError, /must be an object with/)
    expect(() => validator.array().of(() => {})).to.throw(TypeError, /must be an object with/)
    expect(() => validator.array().of([])).to.throw(TypeError, /must be an object with/)
    expect(() => validator.array().of(null)).to.throw(TypeError, /must be an object with/)
    expect(() => validator.array().of({})).to.throw(TypeError, /must be an object with/)
  })

  it('shouldn\'t throw if the type validator provided is a proper object', () => {
    expect(() => validator.array().of(validator.number())).not.to.throw()
  })

  it('should pass if the elements of value are of the given type', () => {
    expect(validator.array().of(validator.number()).test(correct)).to.be.true
  })

  it('should pass if value is an empty array', () => {
    expect(validator.array().of(validator.number()).test([])).to.be.true
  })

  it('should fail if the elements of value aren\'t of the given type', () => {
    expect(validator.array().of(validator.number()).test(incorrect)).to.be.false
  })

  it('shouldn\'t report if the elements of value are of the given type', () => {
    expect(validator.array().of(validator.number()).report(correct)).to.be.false
  })

  it('shouldn\'t report if value is an empty array', () => {
    expect(validator.array().of(validator.number()).report([])).to.be.false
  })

  it('should report indexes of elements that doesn\'t have the given type', () => {
    const result = validator.array().of(validator.number()).report(incorrect)
    expect(result).to.be.an('object')
    expect(result).to.have.property('1', 'number')
    expect(result).to.have.property('2', 'number')
  })

  it('should fallback to parent report if value isn\'t provided', () => {
    expect(validator.array().of(validator.number()).report()).to.equal('required')
  })

}
