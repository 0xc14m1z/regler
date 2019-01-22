import optional from 'src/optional'

import chain from 'src/helpers/chain'
import required from 'src/required'

const number = value =>
  typeof value === 'number' && !Number.isNaN(value)
    || value instanceof Number

export default chain({ required })(optional(number))
