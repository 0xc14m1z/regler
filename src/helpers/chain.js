const addEnhancer = validator => (chained, [enhancerName, enhancer]) => {
  chained[enhancerName] = enhancer(validator)
  return chained
}

const chain = validator => validators =>
  Object.entries(validators).reduce(addEnhancer(validator), validator.bind())

export default chain
