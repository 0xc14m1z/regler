const addEnhancer = validator => (chained, [enhancerName, enhancer]) => {
  chained[enhancerName] = enhancer(validator)
  return chained
}

const chain = validators => validator =>
  Object.entries(validators).reduce(addEnhancer(validator), validator.bind())

export default chain
