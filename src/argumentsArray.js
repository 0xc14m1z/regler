import array from './array'

const argumentsArray = (...args) =>
  ( args.length === 1 && array(args[0]) && args[0] || args )

export default argumentsArray
