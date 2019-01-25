import optional from 'src/optional'

import chain from 'src/helpers/chain'
import required from 'src/required'

const exact = schema => previousValidator => {
  const _exact = value =>
    previousValidator(value)
      && Object.keys(schema).every(key => Object.keys(value).includes(key))

  return chain({ required })(optional(_exact))
}

export default exact
