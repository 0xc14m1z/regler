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

    it('should return an object with proper properties', () => {
      const parent = { test: () => {}, report: () => {} },
            validator = new Validator('name', parent, 'feedback')

      expect(validator).to.be.an('object')
      expect(validator).to.have.property('name', 'name')
      expect(validator.parent).to.deep.equal(parent)
      expect(validator).to.have.property('feedback', 'feedback')
    })

    it('should have default chained validators')
  })

  describe('make', () => {

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
  })

  describe('prototype', () => {

    describe('use', () => {

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
