import optional from 'src/optional'
import throwIf from 'src/helpers/throwIf'

import chain from 'src/helpers/chain'
import required from 'src/required'

const shape = previousValidator => schema => {
  throwIf(schema === undefined)

  const _shape = value =>
    previousValidator(value)
      &&  Object.entries(schema)
                .map(([property, validator]) => validator(value[property]))
                .every(validation => validation === true)

  return chain(optional(_shape))({ required })
}

export default shape
