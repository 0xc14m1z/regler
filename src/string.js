import optional from './optional'

import chain from './helpers/chain'
import required from './required'

const string = value =>
  typeof value === 'string' || value instanceof String

export default chain(optional(string))({ required })
