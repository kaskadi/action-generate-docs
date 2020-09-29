module.exports = (modules, meta, type) => {
  const handlers = {
    layer: getLayerData,
    lambda: getLambdaData,
    api: getApiData
  }
  return handlers[type](modules, meta.provider.tags, meta.layers || {}, meta.functions || {})
}

function getLayerData (modules, tags, layers) {
  return {
    tags: Object.entries(tags).map(entry => `- ${entry[0]}: ${entry[1]}`).join('\n'),
    layers: require('../../main-handlers/layer/get-packages.js')(modules, layers)
  }
}

function getLambdaData (modules, tags, layers, functions) {
  return {
    ...getLayerData(modules, tags, layers),
    functions: require('../../main-handlers/lambda/process-meta.js')(functions, layers)
  }
}

function getApiData (modules, tags, layers, functions) {
  return {
    ...getLambdaData(modules, tags, layers, functions),
    endpoints: require('../../main-handlers/api/get-endpoints.js')(functions)
  }
}
