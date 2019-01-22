import throwIf from 'src/helpers/throwIf'
import optional from 'src/optional'

import chain from 'src/helpers/chain'
import required from 'src/required'

const instanceOf = Class => {
  throwIf(Class === undefined)

  const _instanceOf = value =>
    value instanceof Class

  return chain(optional(_instanceOf))({ required })
}

export default instanceOf
