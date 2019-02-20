import throwIf from 'src/helpers/throwIf'
import use from './use'
import test from './test'
import report from './report'
import make from './make'

import * as Errors from './errors'

const ROOT_VALIDATOR = {
  test: value => value !== undefined,
  report: () => 'required'
}

function Validator(name, parent = ROOT_VALIDATOR, feedback = name) {
  throwIf(
    typeof name !== 'string',
    TypeError, Errors.INVALID_NAME
  )

  throwIf(
    typeof parent !== 'object'
    || typeof parent.test !== 'function'
    || typeof parent.report !== 'function',
    TypeError, Errors.INVALID_PARENT
  )

  throwIf(
    typeof feedback !== 'string',
    TypeError, Errors.INVALID_FEEDBACK
  )

  this.name = name;
  this.parent = parent;
  this.feedback = feedback;
}

Validator.prototype.use = use
Validator.prototype.test = test
Validator.prototype.report = report

Validator.make = make

export default Validator
