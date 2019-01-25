import testObject from './object.test'
import testShape from './shape.test'
import testExact from './exact.test'

const tests = () => {
  describe('object', testObject)
  describe('shape', testShape)
  describe('exact', testExact)
}

export default tests
