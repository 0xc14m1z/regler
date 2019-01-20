import optional from './optional'
import argumentsArray from './argumentsArray'

const _enum = (...values) => {
  const __enum = value =>
    argumentsArray(...values).includes(value)

  return optional(__enum)
}

export default _enum
