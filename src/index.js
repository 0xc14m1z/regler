import validate from './validate'

import array from './array'
import boolean from './boolean'
import _enum from './enum'
import fn from './fn'
import instanceOf from './instanceOf'
import number from './number'
import object from './object'
import optional from './optional'
import required from './required'
import string from './string'

export default {
  validate,

  array,
  boolean,
  enum: _enum,
  fn,
  instanceOf,
  number,
  object,
  optional,
  required,
  string
}
