import Validator from 'src/validator'

function string() {
  this.test = function test(value) {
    return (
      this.parent.test(value)
      && (
        typeof value === 'string'
        || value instanceof String
      )
    )
  }

  return this
}

export default Validator.make(string)
