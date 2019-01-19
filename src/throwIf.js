import string from './string'
import fn from './fn'

const throwIf = (condition, ...options) => {
  if ( condition === true ) {
    switch (options.length) {
      case 0: _throw(Error)
      case 1: {
        string(options[0])
          ? _throw(Error, options[0])
          : fn(options[0])
              ? _throw(options[0])
              : _throw(Error)
      }
      case 2: _throw(options[0], options[1])
    }
  }
}

const _throw = (Class = Error, message = '') => {
  throw new Class(message)
}

export default throwIf
