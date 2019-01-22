import optional from 'src/optional'

import chain from 'src/helpers/chain'
import required from 'src/required'

const fn = value =>
  typeof value === 'function'

export default chain(optional(fn))({ required })
