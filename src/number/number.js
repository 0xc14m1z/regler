import Validator from 'src/validator'

function number() {
  this.test = function number(value) {
    return (
      this.parent.test(value)
      && (
        typeof value === 'number' && !Number.isNaN(value)
        || value instanceof Number
      )
    )
  }

  return this
}

export default Validator.make(number)
