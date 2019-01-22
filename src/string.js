import optional from 'src/optional'

import chain from 'src/helpers/chain'
import required from 'src/required'

const string = value =>
  typeof value === 'string' || value instanceof String

export default chain({ required })(optional(string))
