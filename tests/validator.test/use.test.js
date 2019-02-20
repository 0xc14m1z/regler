import { expect } from 'chai'

import Validator from 'src/validator'

export default function testUse() {

  it('should be a function', () => {
    expect(Validator.prototype.use).to.be.a('function')
  })

  it('should take two parameters', () => {
    expect(Validator.prototype.use.length).to.equal(2)
  })

  it('should throw if given validator name isn\'t a string', () => {
    const validator = new Validator('root'),
          nested = Validator.make(() => {}),
          testEmpty = () => validator.use(undefined, nested),
          testIncorrect = () => validator.use(42, nested),
          testCorrect = () => validator.use('name', nested)

    expect(testEmpty).to.throw(TypeError, /must be a string/)
    expect(testIncorrect).to.throw(TypeError, /must be a string/)
    expect(testCorrect).to.not.throw()
  })

  it('should throw if given validator name isn\'t a function', () => {
    const validator = new Validator('root'),
          nested = Validator.make(() => {}),
          testEmpty = () => validator.use('name'),
          testIncorrect = () => validator.use('name', 42),
          testCorrect = () => validator.use('name', nested)

    expect(testEmpty).to.throw(TypeError, /must be a function/)
    expect(testIncorrect).to.throw(TypeError, /must be a function/)
    expect(testCorrect).to.not.throw()
  })

  it('should add a function property to the context object', () => {
    const validator = new Validator('root'),
          nested = Validator.make(() => {})

    validator.use('name', nested)

    expect(validator.name).to.be.a('function')
  })

  describe('returned function', () => {

    it('should return a Validator instance', () => {
      const validator = new Validator('root'),
            nested = Validator.make(function () { return this })

      validator.use('name', nested)

      expect(validator.name()).to.be.an.instanceof(Validator)
    })

    it('should automatically set a feedback message if provided', () => {
      const validator = new Validator('root'),
            nested = Validator.make(function () { return this })
      let result

      validator.use('name', nested)

      result = validator.name()
      expect(result.feedback).to.equal('name')

      result = validator.name('custom message')
      expect(result.feedback).to.equal('custom message')
    })

    it('should pass all arguments to the inner validator function', () => {
      const validator = new Validator('root'),
            nested = Validator.make(function () {
              return arguments
            })

      validator.use('name', nested)
      const result = validator.name(1, 2, 3)

      expect(result).to.have.lengthOf(3)
    })

    it('should chain all sub-validators set in validator function', () => {
      const validator = new Validator('root'),
            number = Validator.make(function () { return this }),
            greaterThan = Validator.make(function () { return this }),
            lowerThan = Validator.make(function () { return this })

      validator.use('number', number)

      number.chain('greaterThan', greaterThan)
      number.chain('lowerThan', lowerThan)

      expect(validator.number().greaterThan).to.be.a('function')
      expect(validator.number().lowerThan).to.be.a('function')
    })
  })

}
