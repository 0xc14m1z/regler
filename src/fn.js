import optional from './optional'

const fn = value =>
  typeof value === 'function'

export default optional(fn)
