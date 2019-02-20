import { expect } from 'chai'

import Validator from 'src/validator'
// import testValidator from './validator.test'

import testNew from './new.test'
import testMake from './make.test'
import testUse from './use.test'
import testTest from './test.test'
import testReport from './report.test'

export default function testValidator() {

  it('should be a function', () => {
    expect(Validator).to.be.a('function')
  })

  describe('new', testNew)
  describe('make', testMake)

  describe('prototype', () => {
    describe('use', testUse)
    describe('test', testTest)
    describe('report', testReport)
  })

}
