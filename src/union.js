import optional from './optional'
import argumentsArray from './argumentsArray'

const union = (...validators) => {
  const _union = value =>
    argumentsArray(...validators)
      .map(validator => validator(value))
      .some(validation => validation === true)

  return optional(_union)
}

export default union
