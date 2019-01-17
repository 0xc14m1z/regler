import optional from './optional'

const number = value =>
  typeof value === 'number' && !Number.isNaN(value) || value instanceof Number

export default number
