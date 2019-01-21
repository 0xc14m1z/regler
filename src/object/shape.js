import optional from '../optional'
import throwIf from '../throwIf'

import chain from '../helpers/chain'
import required from '../required'

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
