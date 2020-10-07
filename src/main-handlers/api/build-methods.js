module.exports = (modules, endpoints) => {
  return endpoints.map(processEndpoint(modules))
}

function processEndpoint (modules) {
  return endpoint => {
    return {
      ...endpoint,
      methods: endpoint.methods.map(processMethod(modules, endpoint))
    }
  }
}

function processMethod (modules, endpoint) {
  const buildTable = require('./build-table.js')
  const buildExamples = require('./build-examples.js')
  return method => {
    return {
      ...method,
      queryStringParameters: method.queryStringParameters.length > 0 ? buildTable(modules, method.queryStringParameters) : '',
      body: method.body.length > 0 ? buildTable(modules, method.body) : '',
      examples: buildExamples(method, endpoint)
    }
  }
}
