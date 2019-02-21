import Validator from 'src/validator'

function object() {
  this.test = function test(value) {
    return (
      this.parent.test(value)
      && typeof value === 'object'
      && value !== null
      && !(value instanceof Array)
    )
  }

  return this
}

export default Validator.make(object)
