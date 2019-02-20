import Validator from 'src/validator'

function required() {

  // this implementation prevents the call to the parent
  // if the value isn't provided
  this.test = function test(value) {
    return value !== undefined && this.parent.test(value)
  }

  this.report = function report(value) {
    if (value === undefined) return this.feedback
    return this.parent.report(value)
  }

  return this
}

export default Validator.make(required)
