import { expect } from 'chai'

import identify from 'src/helpers/identify'

export default () => {

  it('should return a function', () => {
    const increment = x => x + 1
    const result = identify('inc')(increment)
    expect(result).to.be.a('function')
  })

  it('should return a function with the same behaviour', () => {
    const increment = x => x + 1
    const result = identify('inc')(increment)
    expect(result(41)).to.equal(42)
  })

  it('should return a function with id property', () => {
    const increment = x => x + 1
    const result = identify('inc')(increment)
    expect(result).to.have.property('id', 'inc')
  })

}
