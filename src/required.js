import make from './validator/make'

function required() {

  // this prevents the call to the parent if the value isn't provided
  this.test = function test(value) {
    return value !== undefined && this.parent.test(value)
  }

  this.report = function report(value) {
    if ( value === undefined ) return this.feedback
    return this.parent.report(value)
  }

  return this
}

export default make(required)
