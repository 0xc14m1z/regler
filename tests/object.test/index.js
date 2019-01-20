import testObject from './object.test'
import testShape from './shape.test'

const tests = () => {
  describe('object', testObject)
  describe('shape', testShape)
}

export default tests
