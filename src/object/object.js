import optional from '../optional'
import array from '../array'

const object = value =>
  typeof value === 'object' && !array(value)

export default optional(object)
