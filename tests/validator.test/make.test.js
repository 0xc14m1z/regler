import { expect } from 'chai'

import Validator from 'src/validator'

export default function testMake() {

  it('should be a function', () => {
    expect(Validator.make).to.be.a('function')
  })

  it('should take one parameter', () => {
    expect(Validator.make.length).to.equal(1)
  })

  it('should throw if given validator isn\'t a function', () => {
    const validator = () => {},
          testEmpty = () => Validator.make(),
          testIncorrect = () => Validator.make(42),
          testCorrect = () => Validator.make(validator)

    expect(testEmpty).to.throw(TypeError, /must be a function/)
    expect(testIncorrect).to.throw(TypeError, /must be a function/)
    expect(testCorrect).not.to.throw()
  })

  it('should return a function with proper properties', () => {
    const validator = () => {},
          result = Validator.make(validator)

    expect(result).to.be.a('function')
    expect(result.chained).to.be.an('array')
    expect(result.chained).to.be.empty
    expect(result.chain).to.be.a('function')
  })

  describe('chain', () => {
    it('should throw if given nested validator name isn\'t a string', () => {
      const validator = Validator.make(() => {}),
            nested = () => {},
            testEmpty = () => validator.chain(undefined, nested),
            testIncorrect = () => validator.chain(42, nested),
            testCorrect = () => validator.chain('name', nested)

      expect(testEmpty).to.throw(TypeError, /must be a string/)
      expect(testIncorrect).to.throw(TypeError, /must be a string/)
      expect(testCorrect).to.not.throw()
    })

    it('should throw if given nested validator name isn\'t a function', () => {
      const validator = Validator.make(() => {}),
            nested = () => {},
            testEmpty = () => validator.chain('name'),
            testIncorrect = () => validator.chain('name', 42),
            testCorrect = () => validator.chain('name', nested)

      expect(testEmpty).to.throw(TypeError, /must be a function/)
      expect(testIncorrect).to.throw(TypeError, /must be a function/)
      expect(testCorrect).to.not.throw()
    })

    it('should add the nested validator to `chained` array', () => {
      const validator = Validator.make(() => {})
      validator.chain('name', () => {})

      expect(validator.chained).to.have.lengthOf(1)
      expect(validator.chained[0][0]).to.equal('name')
    })
  })

}
