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
    layers: require('../../main-handlers/layer/get-packages.js')(modules, layers)
  }
}

function getLambdaData (modules, layers, functions) {
  return {
    ...getLayerData(modules, layers),
    functions: require('../../main-handlers/lambda/process-meta.js')(functions, layers)
  }
}

function getApiData (modules, layers, functions) {
  return {
    ...getLambdaData(modules, layers, functions),
    endpoints: require('../../main-handlers/api/get-endpoints.js')(functions)
  }
}
