import argumentsArray from 'src/helpers/argumentsArray'

const compose = (...fns) => param =>
  argumentsArray(...fns)
    .reduce((composed, fn) => fn(composed), param)

export default compose
