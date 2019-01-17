const required = validator => value =>
  value !== undefined && validator(value)

export default required
