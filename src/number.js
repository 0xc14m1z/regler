import optional from './optional'

import chain from './helpers/chain'
import required from './required'

const number = value =>
  typeof value === 'number' && !Number.isNaN(value)
    || value instanceof Number

export default chain(optional(number))({ required })
