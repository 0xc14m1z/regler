import { expect } from 'chai'

import Validator from 'src/validator'
import object from 'src/object'
import string from 'src/string'
import number from 'src/number'
import shape from 'src/object/shape'

export default function testShape() {

  const validator = new Validator('test')
  validator.use('object', object)
  validator.use('string', string)
  validator.use('number', number)

  object.chain('shape', shape)

  const schema = {
    name: validator.string(),
    age: validator.number()
  }

  const correct = {
    name: 'Luke Skywalker',
    age: 42
  }

  const incorrect = {
    name: 42,
    age: 'Luke Skywalker'
  }

  it('should be a function', () => {
    expect(shape).to.be.a('function')
  })

  it('should take one parameter', () => {
    expect(shape.length).to.equal(1)
  })

  it('should be enhanced with `make`', () => {
    expect(shape).to.have.property('chained')
    expect(shape).to.have.property('chain')
  })

  it('should throw if no schema is provided', () => {
    const result = () => validator.object().shape()
    expect(result).to.throw(TypeError, /must be provided/)
  })

  it('should throw if the schema provided isn\'t an object', () => {
    expect(() => validator.object().shape(NaN)).to.throw(TypeError, /must be an object/)
    expect(() => validator.object().shape(true)).to.throw(TypeError, /must be an object/)
    expect(() => validator.object().shape(false)).to.throw(TypeError, /must be an object/)
    expect(() => validator.object().shape(42)).to.throw(TypeError, /must be an object/)
    expect(() => validator.object().shape('string')).to.throw(TypeError, /must be an object/)
    expect(() => validator.object().shape(() => {})).to.throw(TypeError, /must be an object/)
    expect(() => validator.object().shape([])).to.throw(TypeError, /must be an object/)
    expect(() => validator.object().shape(null)).to.throw(TypeError, /must be an object/)
  })

  it('should pass if schema is an empty object', () => {
    expect(validator.object().shape({}).test(incorrect)).to.be.true
  })

  it('should pass if value is an empty object', () => {
    expect(validator.object().shape(schema).test({})).to.be.true
  })

  it('should pass if value has the same shape as the schema provided', () => {
    expect(validator.object().shape(schema).test(correct)).to.be.true
  })

  it('should fail if value doesn\'t have the same shape as the schema provided', () => {
    expect(validator.object().shape(schema).test(incorrect)).to.be.false
  })

  it('shouldn\'t report if schema is an empty object', () => {
    expect(validator.object().shape({}).report(incorrect)).to.be.false
  })

  it('shouldn\'t report if value is an empty object', () => {
    expect(validator.object().shape(schema).report({})).to.be.false
  })

  it('shouldn\'t report if value has the same shape as the schema provided', () => {
    expect(validator.object().shape(schema).report(correct)).to.be.false
  })

  it('should report properties that doesn\'t match the schema', () => {
    const result = validator.object().shape(schema).report(incorrect)
    expect(result).to.be.an('object')
    expect(result).to.have.property('name', 'string')
    expect(result).to.have.property('age', 'number')
  })

  it('should fallback to parent report if value isn\'t provided', () => {
    expect(validator.object().shape(schema).report()).to.equal('required')
  })

}
