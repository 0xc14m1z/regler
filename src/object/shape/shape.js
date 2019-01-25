import optional from 'src/optional'
import throwIf from 'src/helpers/throwIf'

import chain from 'src/helpers/chain'
import exact from 'src/object/shape/exact'
import required from 'src/required'

const shape = previousValidator => schema => {
  throwIf(schema === undefined)

  const _shape = value =>
    previousValidator(value)
      &&  Object.entries(schema)
                .map(([property, validator]) => validator(value[property]))
                .every(validation => validation === true)

  return chain({ required, exact: exact(schema) })(optional(_shape))
}

export default shape
