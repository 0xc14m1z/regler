import optional from '../optional'
import array from '../array'

import chain from '../helpers/chain'
import required from '../required'
import shape from './shape'

const object = value =>
  typeof value === 'object' && !array(value)

export default chain(optional(object))({ required, shape })
