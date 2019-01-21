import optional from './optional'
import argumentsArray from './argumentsArray'

import chain from './helpers/chain'
import required from './required'

const union = (...validators) => {
  const _union = value =>
    argumentsArray(...validators)
      .map(validator => validator(value))
      .some(validation => validation === true)

  return chain(optional(_union))({ required })
}

export default union
