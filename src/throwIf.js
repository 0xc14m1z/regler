import string from './string'
import fn from './fn'

const throwIf = (condition, Class, message) => {
  if ( condition === true ) {
    if ( message )        throw new Class(message)

    if ( Class && string(Class) ) throw new Error(Class)
    if ( Class && fn(Class) )     throw new Class()

    throw new Error()
  }
}

export default throwIf
