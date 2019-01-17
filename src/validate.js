const throwIf = condition => {
  if ( condition ) throw new Error()
}

const validate = schema => {
  throwIf(schema === undefined)

  return target => {
    throwIf(target === undefined)

    return (
      Object.keys(target).length === 0
        ? { isValid: false, errors: {} }
        : Object.entries(schema)
                 .reduce(
                   ({ isValid, errors }, [property, validator]) => {
                     return validator(target[property])
                              ? { isValid, errors }
                              : {
                                isValid: false,
                                errors: {
                                  ...errors,
                                  [property]: [
                                    ...(errors[property] || []),
                                    validator.name
                                  ]
                                }
                              }
                   },
                   { isValid: true, errors: {} }
                 )
    )
  }
}

export default validate
