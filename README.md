# regler

[![TravisCI][build-badge]][build-url]
[![Coveralls][coverage-badge]][coverage-url]
[![CodeClimate][maintainability-badge]][maintainability-url]
[![Codacy][code-quality-badge]][code-quality-url]
[![npm package][npm-badge]][npm]

Functional variables type checker.

## installation

```
npm install --save regler
```

## usage

```js
import t from 'regler'

const check = t.validate({

  optionalArray: t.array,
  optionalBoolean: t.boolean,
  optionalFunction: t.fn,
  optionalNumber: t.number,
  optionalObject: t.object,
  optionalString: t.string,

  optionalPerson: t.instanceOf(Person),

  optionalEnum: t.enum('admin', 'editor', 'guest'),
  // you can pass an array as well:
  // optionalEnum: t.enum(['admin', 'editor', 'guest']),

  optionalUnion: t.union(t.string, t.number),
  // you can pass an array as well:
  // optionalUnion: t.union([t.string, t.number]),

  mandatoryArray: t.array.required,
  mandatoryBoolean: t.boolean.required,
  mandatoryFunction: t.fn.required,
  mandatoryNumber: t.number.required,
  mandatoryObject: t.object.required,
  mandatoryString: t.string.required,

  mandatoryPerson: t.instanceOf(Person).required,

  mandatoryEnum: t.enum('admin', 'editor', 'guest').required,

  optionalArrayOfNumbers: t.array.of(t.number),
  optionalObjectWithStringValues: t.object.of(t.string),

  optionalObjectWithShape: t.object.shape({
    age: t.number,
    name: t.string
  }),
  optionalObjectWith_EXACT_Shape: t.object.shape({
    age: t.number,
    name: t.string
  }).exact,

  mandatoryArrayOfStrings: t.array.of(t.string).required,
  mandatoryObjectWithNumberValues: t.object.of(t.number).required,

  mandatoryObjectWithShape: t.object.shape({
    age: t.number,
    name: t.string
  }).required
  mandatoryObjectWith_EXACT_Shape: t.object.shape({
    age: t.number,
    name: t.string
  }).exact.required,

})

const data = {
  // ... here the object you need to validate
}

const result = check(data)
/*
  if everything matches:
  { isValid: true, errors: {} }

  if something doesn't match:
  {
    isValid: false,
    errors: {

      // errors is an object that has invalid properties as keys and an array of
      // failed validators for that property as values
      invalidProperty: ['number']

    }
  }

*/

```














[build-badge]: https://img.shields.io/travis/0xc14m1z/regler.svg
[build-url]: https://travis-ci.org/0xc14m1z/regler

[coverage-badge]: https://img.shields.io/coveralls/github/0xc14m1z/regler.svg
[coverage-url]: https://coveralls.io/github/0xc14m1z/regler

[maintainability-badge]: https://img.shields.io/codeclimate/maintainability/0xc14m1z/regler.svg
[maintainability-url]: https://codeclimate.com/github/0xc14m1z/regler

[code-quality-badge]: https://img.shields.io/codacy/grade/c5eb6609f4744298bca301b20b11c102.svg
[code-quality-url]: https://www.codacy.com/app/0xc14m1z/regler

[npm-badge]: https://badge.fury.io/js/regler.svg
[npm]: https://badge.fury.io/js/regler
