import optional from 'src/optional'
import argumentsArray from 'src/helpers/argumentsArray'

import chain from 'src/helpers/chain'
import required from 'src/required'

const _enum = (...values) => {
  const __enum = value =>
    argumentsArray(...values).includes(value)

  return chain({ required })(optional(__enum))
}

export default _enum
