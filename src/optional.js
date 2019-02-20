import Validator from 'src/validator'

function optional() {

  // this implementation prevents the call to the parent
  // if the value isn't provided
  // if, instead, it has been provided, relays on parent test
  this.test = function test(value) {
    if ( value === undefined ) return true
    return this.parent.test(value)
  }

  this.report = function report(value) {
    if (this.test(value)) return false
    return this.parent.report(value)
  }

  return this
}

export default Validator.make(optional)
