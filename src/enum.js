import array from './array'

const _enum = (...values) => value =>
  ( values.length === 1
    && array(values)
    && values[0]
    || values
  ).includes(value)

export default _enum
