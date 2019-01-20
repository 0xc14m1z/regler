import optional from './optional'

const boolean = value =>
  value === true
    || value === false
    || value instanceof Boolean

export default optional(boolean)
