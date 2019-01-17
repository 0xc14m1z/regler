const optional = validator => value =>
  value === undefined || validator(value)

export default optional
