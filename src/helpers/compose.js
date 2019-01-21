import argumentsArray from '../argumentsArray'

const compose = (...fns) => param =>
  argumentsArray(...fns)
    .reduce((composed, fn) => fn(composed), param)

export default compose
