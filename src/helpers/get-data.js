module.exports = (modules, meta, type) => {
  const handlers = {
    layer: getLayerData,
    lambda: getLambdaData,
    api: getApiData
  }
  return handlers[type](modules, meta.layers || {}, meta.functions || {})
}

function getLayerData (modules, layers) {
  return {
    layers: require('./layer/get-packages.js')(modules, layers)
  }
}

function getLambdaData (modules, layers, functions) {
  return {
    ...getLayerData(modules, layers),
    functions: require('./lambda/process-meta.js')(functions, layers)
  }
}

function getApiData (modules, layers, functions) {
  return {
    ...getLambdaData(modules, layers, functions),
    endpoints: require('./api/get-endpoints.js')(functions)
  }
}
