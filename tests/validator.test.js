import { expect } from 'chai'

export default function validator() {
  it('should be a function')

  describe('new', () => {
    it('should return an object')
    it('should return an object with proper properties')
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
