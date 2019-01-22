import { expect } from 'chai'

import argumentsArray from 'src/helpers/argumentsArray'

const tests = () => {

  it('should return an empty array if no arguments are given', () => {
    const result = argumentsArray()
    expect(result).to.be.an('array').that.is.empty
  })

  it('should return an empty array if an empty array is given', () => {
    const result = argumentsArray([])
    expect(result).to.be.an('array').that.is.empty
  })

  it('should return an array with given arguments', () => {
    const result = argumentsArray(1, 2, 3)
    expect(result).to.eql([1, 2, 3])
  })

  it('should return a one dimensional array with given arguments', () => {
    const result = argumentsArray([1, 2, 3])
    expect(result).to.eql([1, 2, 3])
  })

  it('should return a two dimensional array with given arguments', () => {
    const result = argumentsArray([1, 2, 3], [4, 5, 6], [7, 8, 9])
    expect(result).to.eql([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
  })

}

export default tests
