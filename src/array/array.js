import optional from 'src/optional'

import chain from 'src/helpers/chain'
import required from 'src/required'

const array = value =>
  value instanceof Array

export default chain({ required })(optional(array))
