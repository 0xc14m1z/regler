import throwIf from 'src/helpers/throwIf'

const INVALID_NAME_ERROR =
  'The name of a Validator must be a string'

const INVALID_PARENT_ERROR =
  'The parent of a Validator must be an object with `test` and `report` methods'

const INVALID_FEEDBACK_ERROR =
  'The feedback message of a Validator must be a string'

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

export default Validator
