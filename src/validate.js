const throwIf = condition => {
  if ( condition ) throw new Error()
}

const validate = schema => {
  throwIf(schema === undefined)

  return target => {
    throwIf(target === undefined)

    return (
      Object.keys(target).length === 0
        ? { isValid: false, errors: [] }
        : Object.entries(schema)
                 .reduce(
                   ({ isValid, errors }, [property, validator]) => {
                     const {
                       isValid: isPropertyValid,
                       errors: propertyErrors
                     } = validator(target[property])

                     return {
                       isValid: isValid && isPropertyValid,
                       errors: errors.concat(errors)
                     }
                   },
                   { isValid: true, errors: [] }
                 )
    )
  }
}

export default validate
