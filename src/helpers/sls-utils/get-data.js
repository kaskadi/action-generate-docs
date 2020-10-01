const types = {
  layer: {
    key: 'layers',
    getDataHandler: (modules, meta) => require('../../main-handlers/layer/get-packages.js')(modules, meta)
  },
  lambda: {
    key: 'functions',
    getDataHandler: (modules, meta) => require('../../main-handlers/lambda/process-meta.js')(meta)
  },
  api: {
    key: 'endpoints',
    getDataHandler: (modules, meta) => require('../../main-handlers/api/get-endpoints.js')(meta)
  }
}

module.exports = (modules, meta, type) => {
  meta = {
    layers: {},
    functions: {},
    ...meta
  }
  return getData4Type(modules, meta, type)
}

function getData4Type (modules, meta, type) {
  var data = {}
  for (const typeKey in types) {
    const key = types[typeKey].key
    const value = types[typeKey].getDataHandler(modules, meta)
    data[key] = value
    if (typeKey === type) {
      break
    }
  }
  return data
}
