import testShape from './shape.test'
import testExact from './exact.test'

const tests = () => {
  describe('shape', testShape)
  describe('exact', testExact)
}

export default tests
