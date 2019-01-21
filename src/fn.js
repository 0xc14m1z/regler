import optional from './optional'

import chain from './helpers/chain'
import required from './required'

const fn = value =>
  typeof value === 'function'

export default chain(optional(fn))({ required })
