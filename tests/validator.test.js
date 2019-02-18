import { expect } from 'chai'

import Validator from 'src/validator'

export default function validator() {
  it('should be a function', () => {
    expect(Validator).to.be.a('function')
  })

  describe('new', () => {

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

    it('should return an object')
    it('should return an object with proper properties')
    it('should have default chained validators')
  })

  describe('make', () => {
    it('should take a parameter')
    it('should throw if given validator isn\'t a function')
    it('should return a function')
    it('should return a function with proper properties')
  })

  describe('prototype', () => {

    describe('use', () => {
      it('should take two parameters')
      it('should throw if given name isn\'t a string')
      it('should throw if given validator isn\'t a function')
      it('should add a property to the context object')
      it('should add a property to the context object that is a function')

      describe('returned function', () => {
        it('should return an object')
        it('should automatically set a feedback message if provided')
        it('should pass all arguments to the inner validator function')
        it('should chain all sub-validators set in validator function')
      })
    })

    describe('test', () => {
      it('should take a parameter')
      it('should pass if value is provided')
      it('should fail if value isn\'t provided')
    })

    describe('report', () => {
      it('should take a parameter')
      it('should return false if value is provided')
      it('should return \'required\' if value isn\'t provided')
    })

  })
}
