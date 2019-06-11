# regler

[![TravisCI][build-badge]][build-url]
[![Coveralls][coverage-badge]][coverage-url]
[![CodeClimate][maintainability-badge]][maintainability-url]
[![Codacy][code-quality-badge]][code-quality-url]
[![npm package][npm-badge]][npm]
![minzipped size][minzipped]

Extensible type and value checker.

**Table of contents**

1. installation
2. usage
3. out of the box validators
4. custom validators

## installation

```
npm install --save regler
```

## usage

This package gives you two methods to check whether the input is of a certain
type or pass a validation in general: `test` and `report`.

### test

This method returns `true` when the input satisfies the validator, `false`
otherwise.

```js
import R from 'regler'

R.number().test(42)           // true
R.number().test('string')     // false
```

### report

This method return different possible values, depending on user setting and
the type of validator being used.

The convention is that a validator must return `false` if it has nothing to
report.

```js
import R from 'regler'

R.number().report(42)
// returns false, nothing to report on that input

R.number().report('string')
// returns the string 'number'. The default report is the name of the validator.

R.number('must be a number').report('string')
// returns 'must be a number'
```

Generally speaking, the last string parameter passed to the validator will be
used as the feedback message when reporting.

There are some validators that are chained to others, and the validation is
tested from left to right, with each validator able to report an error:

```js
import R from 'regler'

R.array().of(R.number()).report('string')
// returns 'array', because is the left-most validations that fails

R.array('should be a list').of(R.number()).report('string')
// returns 'should be a list'
// the custom feedback mechanism works the same

R.array().of(R.number()).report(['element', 42, 'other'])
// returns:
// {
//   0: 'number',
//   2: 'number'
// }
//
// the elements at indexes 0 and 2 have the
// number validator default feedback message

R.array().of(R.number('should be a number')).report(['element', 42, 'other'])
// returns:
// {
//   0: 'should be a number',
//   2: 'should be a number'
// }
//
// the elements at indexes 0 and 2 have the provided feedback message

R.object().shape({
  name: R.string(),
  age: R.number()
}).report({
  name: 'Luke Skywalker',
  age: 'unknown'
})
// returns:
// {
//   age: 'number'
// }
//
// properties that doesn't pass validations have the validator feedback message
```

### required/optional values

All validators are implicitly required. It possible, though, to make them
optional:

```js
import R from 'regler'

R.number().test()
// returns false, it is implicitly required

R.number().optional().test()
// returns true

R.number().report()
// returns 'required', the default feedback message for required validators

R.number().required('must be present').report()
// returns 'must be present'
```

## out of the box validators

1. array
2. boolean
3. function
4. instanceOf
5. number
6. object
7. oneOf
8. string

## custom validators

It is possible to create new validators and add them to the main `R` object or
chain them to other validators.

A validator is a constructable function that receives an external context and
adds to it at least the `test` method. The `report` method can also be added in
order to customize the reporting is handled.

### sample custom validator

WIP

### add first level validators

A first level validator is a validator that is accessibile directly from the
main `R` object, like `number`, `string` or `array`.

WIP


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

[minzipped]: https://img.shields.io/bundlephobia/minzip/regler.svg?color=brightgreen