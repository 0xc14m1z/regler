import optional from 'src/optional'
import argumentsArray from 'src/helpers/argumentsArray'

import chain from 'src/helpers/chain'
import required from 'src/required'

const union = (...validators) => {
  const _union = value =>
    argumentsArray(...validators)
      .map(validator => validator(value))
      .some(validation => validation === true)

  return chain({ required })(optional(_union))
}

export default union
