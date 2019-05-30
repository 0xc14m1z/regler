import Validator from '../validator'

function array() {
  this.test = function test(value) {
    return this.parent.test(value) && value instanceof Array
  }

  return this
}

export default Validator.make(array)
