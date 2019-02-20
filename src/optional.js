import make from 'src/validator/make'

function optional() {

  // this prevents the call to the parent test if the value isn't provided
  // if, instead, it has been provided, relays on parent test
  this.test = function test(value) {
    if ( value === undefined ) return true
    return this.parent.test(value)
  }

  this.report = function report(value) {
    if ( this.test(value) ) return false
    return this.parent.report(value)
  }

  return this
}

export default make(optional)
