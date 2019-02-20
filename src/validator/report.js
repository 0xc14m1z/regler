function report(value) {
  if ( this.test(value) ) return false
  return this.parent.report(value) || this.feedback
}

export default report
