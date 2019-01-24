import optional from 'src/optional'
import array from 'src/array'

import chain from 'src/helpers/chain'
import required from 'src/required'
import shape from 'src/object/shape'
import _of from 'src/object/of'

const object = value =>
  typeof value === 'object' && !array(value)

export default chain({ required, shape, of: _of })(optional(object))
