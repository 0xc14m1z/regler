import { expect } from 'chai'

import object from 'src/object'
import _of from 'src/object/of'
import array from 'src/array'
import string from 'src/string'
import validate from 'src/validate'

const tests = () => {

  it('should throw if the type is undefined', () => {
    const result = () => _of(object)(undefined)
    expect(result).to.throw()
  })

  it('should throw if the type is not given at all', () => {
    const result = () => _of(object)()
    expect(result).to.throw()
  })

  it('should pass if the object has values of the given type', () => {
    const value = {
      firstProperty: 'a',
      secondProperty: 'b',
      thirdProperty: 'c'
    }
    const isValid = _of(object)(string)(value)
    expect(isValid).to.be.true
  })

  it('should pass if the object is empty', () => {
    const value = {}
    const isValid = _of(object)(string)(value)
    expect(isValid).to.be.true
  })

  it('should fail if the object has values with different type', () => {
    const value = {
      firstProperty: 1,
      secondProperty: 2,
      thirdProperty: 3
    }
    const isValid = _of(object)(string)(value)
    expect(isValid).to.be.false
  })

  describe('chained', () => {

    it('should have #required enhancer chained', () => {
      const isValid = _of(object)(string).required()
      expect(isValid).to.be.false
    })

  })

}

export default tests
