import Validator from '../validator'

function number() {
  this.test = function test(value) {
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
