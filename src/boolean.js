import optional from './optional'

import chain from './helpers/chain'
import required from './required'

const boolean = value =>
  value === true
    || value === false
    || value instanceof Boolean

export default chain(optional(boolean))({ required })
