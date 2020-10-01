module.exports = (modules, meta, type) => {
  const handlers = {
    layer: getLayerData,
    lambda: getLambdaData,
    api: getApiData
  }
  meta = {
    layers: {},
    functions: {},
    ...meta
  }
  return handlers[type](modules, meta)
}

function getLayerData (modules, meta) {
  const { layers } = meta
  return {
    layers: require('../../main-handlers/layer/get-packages.js')(modules, layers)
  }
}

function getLambdaData (modules, meta) {
  const { layers, functions } = meta
  return {
    ...getLayerData(modules, layers),
    functions: require('../../main-handlers/lambda/process-meta.js')(functions, layers)
  }
}

function getApiData (modules, meta) {
  const { layers, functions } = meta
  return {
    ...getLambdaData(modules, layers, functions),
    endpoints: require('../../main-handlers/api/get-endpoints.js')(functions)
  }
}
