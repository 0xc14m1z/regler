import string from './string'
import fn from './fn'

const throwIf = (condition, Class, message) => {
  if ( condition === true ) {
    if ( message )        throw new Class(message)
    if ( string(Class) )  throw new Error(Class)
    if ( fn(Class) )      throw new Class()

    throw new Error()
  }
}

export default throwIf
