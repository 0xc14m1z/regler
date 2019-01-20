import throwIf from './throwIf'
import optional from './optional'

const instanceOf = Class => {
  throwIf(Class === undefined)

  const _instanceOf = value =>
    value instanceof Class

  return optional(_instanceOf)
}

export default instanceOf
