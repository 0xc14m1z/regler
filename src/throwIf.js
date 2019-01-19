import string from './string'
import fn from './fn'

const throwIf = (condition, Class, message) => {
  if ( condition === true ) {
    if ( message ) _throw(Class, message)

    if ( string(Class) ) _throw(undefined, Class)
    if ( fn(Class) ) _throw(Class)

    _throw()
  }
}

const _throw = (Class = Error, message = '') => {
  throw new Class(message)
}

export default throwIf
