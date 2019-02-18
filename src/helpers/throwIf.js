function throwIf(condition, Class, message) {
  if ( condition !== true ) return

  // if the message is given, the Class must be provided.
  // if it's not, it would throw anyway for a non-callable object exception
  if ( message )
    throw new Class(message)

  // if the second parameter is a string,
  // then it's the custom message for a generic Error
  if ( typeof Class === 'string' )
    throw new Error(Class)

  // if the second parameter is a function,
  // then it's the error class to throw
  if ( typeof Class === 'function' )
    throw new Class()

  // if nothing is given, a generic Error is thrown
  throw new Error()
}

export default throwIf
