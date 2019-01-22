import optional from 'src/optional'

import chain from 'src/helpers/chain'
import required from 'src/required'

const boolean = value =>
  value === true
    || value === false
    || value instanceof Boolean

export default chain({ required })(optional(boolean))
