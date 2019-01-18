import { expect } from 'chai'

import validate from 'src/validate'

const tests = () => {

  describe('schema', () => {

    it('should throw if schema is undefined', () => {
      const schema = undefined,
            result = () => validate(schema)
      expect(result).to.throw()
    })

    it('should throw if schema is not given at all', () => {
      const result = () => validate()
      expect(result).to.throw()
    })

  })

  describe('target', () => {

    it('should throw if the target is undefined', () => {
      const schema = {},
            target = undefined,
            result = () => validate(schema)(target)
      expect(result).to.throw()
    })

    it('should throw if the target is not given at all', () => {
      const schema = {},
            result = () => validate(schema)()
      expect(result).to.throw()
    })

    it('should fail if target is an empty object', () => {
      const schema = {},
            target = {},
            result = validate(schema)(target)
      expect(result.isValid).to.be.false
      expect(result.errors).to.deep.equal({})
    })

  })

  describe('shape', () => {

    it('should pass if validation result has proper keys', () => {
      const schema = {},
            target = {},
            result = validate(schema)(target)
      expect(result).to.be.an('object').that.has.all.keys('isValid', 'errors')
    })

    it('should pass if validation result "isValid" is a boolean', () => {
      const schema = {},
            target = {},
            result = validate(schema)(target)
      expect(result.isValid).to.be.a('boolean')
    })

    it('should pass if validation result "errors" is an object', () => {
      const schema = {},
            target = {},
            result = validate(schema)(target)
      expect(result.errors).to.be.an('object')
    })

    it('should pass if validation result "errors" contains failing property names as keys', () => {
      const firstFailingValidator = () => false
      const secondFailingValidator = () => false
      const succesfulValidator = () => true

      const schema = {
              property: firstFailingValidator,
              otherProperty: succesfulValidator,
              lastProperty: secondFailingValidator
            },
            target = {
              property: 42,
              otherProperty: '42',
              lastProperty: 4.2
            },
            result = validate(schema)(target)

      expect(result.errors).to.have.all.keys(['property', 'lastProperty'])
    })

    it('should pass if validation result "errors" contains failing validators names per property key', () => {
      const firstFailingValidator = () => false
      const secondFailingValidator = () => false
      const succesfulValidator = () => true

      const schema = {
              property: firstFailingValidator,
              otherProperty: succesfulValidator,
              lastProperty: secondFailingValidator
            },
            target = {
              property: 42,
              otherProperty: '42',
              lastProperty: 4.2
            },
            result = validate(schema)(target)

      expect(result.errors.property).to.deep.equal(['firstFailingValidator'])
      expect(result.errors.lastProperty).to.deep.equal(['secondFailingValidator'])
    })

  })

  describe('result', () => {

    it('should pass if schema is valid and has no errors', () => {
      const validator = () => true
      const schema = { prop: validator },
            target = { prop: 42 },
            result = validate(schema)(target)
      expect(result.isValid).to.be.true
      expect(result.errors).to.deep.equal({})
    })

  })

}

export default tests
