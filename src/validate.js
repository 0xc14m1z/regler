const throwIf = condition => {
  if ( condition ) throw new Error()
}

const validate = schema => {
  throwIf(schema === undefined)

  return target => {
    throwIf(target === undefined)

    return ({ isValid: true, errors: [] })
  }
}

export default validate
