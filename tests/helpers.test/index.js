import testArgumentsArray from './argumentsArray.test'
import testChain from './chain.test'
import testCompose from './compose.test'
import testIdentify from './identify.test'
import testThrowIf from './throwIf.test'

const tests = () => {
  describe('argumentsArray', testArgumentsArray)
  describe('chain', testChain)
  describe('compose', testCompose)
  describe('identify', testIdentify)
  describe('throwIf', testThrowIf)
}

export default tests
