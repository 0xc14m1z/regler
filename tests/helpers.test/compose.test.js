import { expect } from 'chai'

import compose from 'src/helpers/compose'

const tests = () => {

  it('should return a function', () => {
    const increment = x => x + 1
    const double = x => x * 2
    const result = compose(increment, double)
    expect(result).to.be.a('function')
  })

  it('should apply all the given arguments list functions', () => {
    const increment = x => x + 1
    const double = x => x * 2
    const result = compose(increment, double)(5)
    expect(result).to.equal(12)
  })

  it('should apply all the given functions as an array', () => {
    const increment = x => x + 1
    const double = x => x * 2
    const result = compose([increment, double])(5)
    expect(result).to.equal(12)
  })

}

export default tests
