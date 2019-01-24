import optional from 'src/optional'
import throwIf from 'src/helpers/throwIf'

import array from 'src/array'

import chain from 'src/helpers/chain'
import required from 'src/required'

const _of = previousValidator => validator => {
  throwIf(validator === undefined)

  const __of = value =>
    previousValidator(value)
      && array.of(validator)(Object.values(value))

  return chain({ required })(optional(__of))
}

export default _of
