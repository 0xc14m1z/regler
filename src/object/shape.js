import optional from '../optional'
import throwIf from '../throwIf'

const shape = previousValidator => schema => {
  throwIf(schema === undefined)

  const _shape = value =>
    previousValidator(value)
      &&  Object.entries(schema)
                .map(([property, validator]) => validator(value[property]))
                .every(validation => validation === true)

  return optional(_shape)
}

export default shape
