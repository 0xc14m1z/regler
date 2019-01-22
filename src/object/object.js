import optional from 'src/optional'
import array from 'src/array'

import chain from 'src/helpers/chain'
import required from 'src/required'
import shape from 'src/object/shape'

const object = value =>
  typeof value === 'object' && !array(value)

export default chain({ required, shape })(optional(object))
