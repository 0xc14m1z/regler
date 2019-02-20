import Validator from 'src/validator'

function fn() {
  this.test = function test(value) {
    return this.parent.test(value) && typeof value === 'function'
  }

  return this
}

export default Validator.make(fn)
