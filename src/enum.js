import optional from './optional'
import argumentsArray from './argumentsArray'

import chain from './helpers/chain'
import required from './required'

const _enum = (...values) => {
  const __enum = value =>
    argumentsArray(...values).includes(value)

  return chain(optional(__enum))({ required })
}

export default _enum
