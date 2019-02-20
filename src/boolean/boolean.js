import Validator from 'src/validator'

function boolean() {
  this.test = function test(value) {
    return (
      this.parent.test(value)
      && (
        value === true
        || value === false
        || value instanceof Boolean
      )
    )
  }

  return this
}

export default Validator.make(boolean)
