import optional from 'src/optional'
import throwIf from 'src/helpers/throwIf'

import chain from 'src/helpers/chain'
import required from 'src/required'

const _of = previousValidator => validator => {
  throwIf(validator === undefined)

  const __of = value =>
    previousValidator(value)
      && value.every(element => validator(element))

  return chain({ required })(optional(__of))
}

export default _of
