function test(value) {
  return this.parent.test(value)
}

export default test
