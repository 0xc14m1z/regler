import { expect } from 'chai'

import Validator from 'src/validator'

export default function testNew() {

  it('should throw if given name isn\'t a string', () => {
    const testEmpty = () => new Validator(),
          testNumber = () => new Validator(42),
          testCorrect = () => new Validator('name')

    expect(testEmpty).to.throw(TypeError, /must be a string/)
    expect(testNumber).to.throw(TypeError, /must be a string/)
    expect(testCorrect).not.to.throw()
  })

  it('should throw if given parent isn\'t a proper object', () => {
    const testNumber = () => new Validator('name', 42),
          testImproperObject = () => new Validator('name', {}),
          CORRECT_PARENT = { test: () => {}, report: () => {} },
          testCorrect = () => new Validator('name', CORRECT_PARENT)

    expect(testNumber).to.throw(TypeError, /must be an object with/)
    expect(testImproperObject).to.throw(TypeError, /must be an object with/)
    expect(testCorrect).not.to.throw()
  })

  it('should throw if given feedback isn\'t a string', () => {
    const testNumber = () => new Validator('name', undefined, 42),
          testCorrect = () => new Validator('name', undefined, 'feedback')

    expect(testNumber).to.throw(TypeError, /must be a string/)
    expect(testCorrect).not.to.throw()
  })

  it('should return an object with proper properties', () => {
    const parent = { test: () => {}, report: () => {} },
          validator = new Validator('name', parent, 'feedback')

    expect(validator).to.be.an('object')
    expect(validator).to.have.property('name', 'name')
    expect(validator.parent).to.deep.equal(parent)
    expect(validator).to.have.property('feedback', 'feedback')
  })

  it('should have default chained validators')

}
