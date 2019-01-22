import testArray from './array.test'
import testOf from './of.test'

const tests = () => {
  describe('array', testArray)
  describe('of', testOf)
}

export default tests
