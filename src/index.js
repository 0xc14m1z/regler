import validate from 'src/validate'

import array from 'src/array'
import boolean from 'src/boolean'
import _enum from 'src/enum'
import fn from 'src/fn'
import instanceOf from 'src/instanceOf'
import number from 'src/number'
import object from 'src/object'
import optional from 'src/optional'
import required from 'src/required'
import string from 'src/string'
import union from 'src/union'

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
  string,
  union
}
