import { expect } from 'chai'

import chain from 'src/helpers/chain'
import object from 'src/object'
import string from 'src/string'
import number from 'src/number'
import required from 'src/required'
import shape from 'src/object/shape'
import validate from 'src/validate'

const tests = () => {

  it('should add the given higher order validator', () => {
    const validator = chain(object)({ required })
    const isValid = validator.required()

    expect(validator.required).to.be.a('function')
    expect(isValid).to.be.false
  })

  it('should add the given higher order validator arguments list', () => {
    const validator = chain(object)({ required, shape })
    const schema = { name: string, age: number }

    const isValid = validator.shape(schema)()

    expect(validator.required).to.be.a('function')
    expect(validator.shape).to.be.a('function')
    expect(isValid).to.be.true
  })

}

export default tests
