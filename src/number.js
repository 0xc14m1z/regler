import optional from './optional'

const number = value =>
  value === undefined
    || (typeof value === 'number' && !Number.isNaN(value))
    || value instanceof Number

export default number
