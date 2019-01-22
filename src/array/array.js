import optional from 'src/optional'

import chain from 'src/helpers/chain'
import required from 'src/required'
import _of from 'src/array/of'

const array = value =>
  value instanceof Array

export default chain({ required, of: _of })(optional(array))
