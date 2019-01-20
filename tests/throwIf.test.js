import { expect } from 'chai'

import throwIf from 'src/throwIf'

const tests = () => {

  it('should throw if the argument is true', () => {
    const result = () => throwIf(true)
    expect(result).to.throw()
  })

  it('should throw an Error object if the argument is true', () => {
    const result = () => throwIf(true)
    expect(result).to.throw(Error)
  })

  it('shouldn\'t throw if the argument is truthy', () => {
    const result = () => throwIf(1)
    expect(result).not.to.throw()
  })

  it('shouldn\' throw if the argument is false', () => {
    const result = () => throwIf(false)
    expect(result).not.to.throw()
  })

  it('shouldn\'t throw if the argument is falsy', () => {
    const result = () => throwIf(0)
    expect(result).not.to.throw()
  })

  it('should throw with custom error message', () => {
    const result = () => throwIf(true, 'Custom error message')
    expect(result).to.throw('Custom error message')
  })

  it('should throw with custom error class', () => {
    const result = () => throwIf(true, TypeError)
    expect(result).to.throw(TypeError)
  })

  it('should throw with custom error class and custom error message', () => {
    const result = () => throwIf(true, ReferenceError, 'Custom error message')
    expect(result).to.throw(ReferenceError, 'Custom error message')
  })

}

export default tests
