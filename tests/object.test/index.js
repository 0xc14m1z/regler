import testObject from './object.test'
import testShape from './shape.test'
import testOf from './of.test'

const tests = () => {
  describe('object', testObject)
  describe('shape', testShape)
  describe('of', testOf)
}

export default tests
