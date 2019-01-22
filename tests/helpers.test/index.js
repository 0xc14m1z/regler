import testArgumentsArray from './argumentsArray.test'
import testCompose from './compose.test'
import testChain from './chain.test'
import testThrowIf from './throwIf.test'

const tests = () => {
  describe('argumentsArray', testArgumentsArray)
  describe('compose', testCompose)
  describe('chain', testChain)
  describe('throwIf', testThrowIf)
}

export default tests
