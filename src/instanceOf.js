import throwIf from './throwIf'

const instanceOf = Class => {
  throwIf(Class === undefined)

  return value => value instanceof Class
}

export default instanceOf
