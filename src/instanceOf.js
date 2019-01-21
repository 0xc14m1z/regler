import throwIf from './throwIf'
import optional from './optional'

import chain from './helpers/chain'
import required from './required'

const instanceOf = Class => {
  throwIf(Class === undefined)

  const _instanceOf = value =>
    value instanceof Class

  return chain(optional(_instanceOf))({ required })
}

export default instanceOf
