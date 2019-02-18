import throwIf from 'src/helpers/throwIf'

const INVALID_NAME_ERROR =
  'The name of a Validator must be a string'

const INVALID_PARENT_ERROR =
  'The parent of a Validator must be an object with `test` and `report` methods'

const INVALID_FEEDBACK_ERROR =
  'The feedback message of a Validator must be a string'

const INVALID_VALIDATOR_ERROR =
  'The validator to enhance must be a function'

const INVALID_NESTED_VALIDATOR_NAME_ERROR =
  'The name of a nested validator must be a string'

const INVALID_NESTED_VALIDATOR_ERROR =
  'The nested validator must be a function'

const ROOT_VALIDATOR = {
  test: value => value !== undefined,
  report: () => "required"
}

function Validator(name, parent = ROOT_VALIDATOR, feedback = name) {
  throwIf(
    typeof name !== 'string',
    TypeError, INVALID_NAME_ERROR
  )

  throwIf(
    typeof parent !== 'object'
    || typeof parent.test !== 'function'
    || typeof parent.report !== 'function',
    TypeError, INVALID_PARENT_ERROR
  )

  throwIf(
    typeof feedback !== 'string',
    TypeError, INVALID_FEEDBACK_ERROR
  )

  this.name = name;
  this.parent = parent;
  this.feedback = feedback;
}

Validator.make = function make(validator) {
  throwIf(
    typeof validator !== 'function',
    TypeError, INVALID_VALIDATOR_ERROR
  )

  validator.chained = []

  validator.chain = function chain(name, nestedValidator) {
    throwIf(
      typeof name !== 'string',
      TypeError, INVALID_NESTED_VALIDATOR_NAME_ERROR
    )

    throwIf(
      typeof nestedValidator !== 'function',
      TypeError, INVALID_NESTED_VALIDATOR_ERROR
    )

    this.chained.push([name, nestedValidator]);
  }

  return validator
}

Validator.prototype.use = function use(name, validator) {
  throwIf(
    typeof name !== 'string',
    TypeError, INVALID_NESTED_VALIDATOR_NAME_ERROR
  )

  throwIf(
    typeof validator !== 'function',
    TypeError, INVALID_NESTED_VALIDATOR_ERROR
  )

  this[name] = function createNestedValidator() {
    let feedback;
    if (arguments.length > validator.length
        && typeof arguments[validator.length] === 'string')
      feedback = arguments[validator.length];

    const context = new Validator(name, this, feedback);
    const result = validator.apply(context, arguments)

    validator.chained.forEach(
      function applyChainedValidator([name, nestedValidator]) {
        result.use(name, nestedValidator)
      }
    )

    return result
  }
}

Validator.prototype.test = function test(value) {
  return this.parent.test(value)
}

Validator.prototype.report = function report(value) {
  if ( this.parent.test(value) ) return false
  return this.parent.report(value) || this.feedback
}

export default Validator
