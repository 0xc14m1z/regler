import Validator from './validator'

import boolean from './boolean'
import number from './number'
import string from './string'
import fn from './function'

import array from './array'
import of from './array/of'

import object from './object'
import shape from './object/shape'

import instanceOf from './instanceOf'
import oneOf from './oneOf'

const R = new Validator('regler')

R.use('boolean', boolean)
R.use('number', number)
R.use('string', string)
R.use('function', fn)

R.use('array', array)
array.chain('of', of)

R.use('object', object)
object.chain('shape', shape)

R.use('instanceOf', instanceOf)
R.use('oneOf', oneOf)

export default R
