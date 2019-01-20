import optional from './optional'

const string = value =>
  typeof value === 'string'
    || value instanceof String

export default optional(string)
