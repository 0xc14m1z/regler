import { expect } from 'chai'

import array from 'src/array'
import _of from 'src/array/of'
import string from 'src/string'
import validate from 'src/validate'

const tests = () => {

  it('should throw if the type is undefined', () => {
    const result = () => _of(array)(undefined)
    expect(result).to.throw()
  })

  it('should throw if the type is not given at all', () => {
    const result = () => _of(array)()
    expect(result).to.throw()
  })

  it('should pass if the array has elements of the given type', () => {
    const value = ['a', 'b', 'c']
    const isValid = _of(array)(string)(value)
    expect(isValid).to.be.true
  })

  it('should pass if the array is empty', () => {
    const value = []
    const isValid = _of(array)(string)(value)
    expect(isValid).to.be.true
  })

  it('should fail if the array has elements with different type', () => {
    const value = [1, 2, 3]
    const isValid = _of(array)(string)(value)
    expect(isValid).to.be.false
  })

  describe('chained', () => {

    it('should have #required enhancer chained', () => {
      const isValid = _of(array)(string).required()
      expect(isValid).to.be.false
    })

  })

}

export default tests
