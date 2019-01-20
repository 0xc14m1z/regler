import optional from './optional'
import array from './array'

const _enum = (...values) => {
  const __enum = value =>
    ( values.length === 1
      && array(values)
      && values[0]
      || values
    ).includes(value)

  return optional(__enum)
}

export default _enum
