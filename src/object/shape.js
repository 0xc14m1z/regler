import optional from '../optional'
import throwIf from '../throwIf'
import object from './object'

const shape = schema => {
  throwIf(schema === undefined)

  const _shape = value =>
    object(value)
      &&  Object.entries(schema)
                .map(([property, validator]) => validator(value[property]))
                .every(validation => validation === true)

  return optional(_shape)
}

export default shape
