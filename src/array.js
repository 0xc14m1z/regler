import optional from './optional'

import chain from './helpers/chain'
import required from './required'

const array = value =>
  value instanceof Array

export default chain(optional(array))({ required })
