import { expect } from 'chai'

import testValidator from './validator.test'

import testRequired from './required.test'
import testOptional from './optional.test'

import testHelpers from './helpers.test'

describe('Regler', () => {

  describe('Validator', testValidator)

  describe('Native validators', () => {

    describe('required', testRequired)
    describe('optional', testOptional)

  })

  describe('Helpers', testHelpers)

})
