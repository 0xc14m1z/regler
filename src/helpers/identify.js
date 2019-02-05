const identify = id => fn => {
  Object.defineProperty(fn, 'id', { value: id })
  return fn
}

export default identify
