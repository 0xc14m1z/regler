import throwIf from 'src/helpers/throwIf'

const DEFAULT_RESULT = { isValid: false, errors: {} }
const INITIAL_RESULT = { isValid: true, errors: {} }

const empty = object =>
  Object.keys(object).length === 0

const addError = (errors, error) =>
  (errors || []).concat(error)

const addFailure = (errors, property, validatorName) => ({
  isValid: false,
  errors: { ...errors, [property]: addError(errors[property], validatorName) }
})

const performValidator = (status, validator, property, value) =>
  validator(value)
    ? status
    : addFailure(status.errors, property, validator.name)

const checkKey = target => (result, [property, validator]) =>
  performValidator(result, validator, property, target[property])

const checkKeys = (schema, target) =>
  Object.entries(schema).reduce(checkKey(target), INITIAL_RESULT)

const validate = schema => {
  throwIf(schema === undefined)

  return target => {
    throwIf(target === undefined)

    if ( empty(target) ) return DEFAULT_RESULT
    return checkKeys(schema, target)
  }
}

export default validate
