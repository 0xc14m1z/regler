import { expect } from 'chai'

import testValidate from './validate.test'
import testRequired from './required.test'
import testOptional from './optional.test'

describe('Regler', () => {
  describe('validate', testValidate)
  describe('required', testRequired)
  describe('optional', testOptional)
})
