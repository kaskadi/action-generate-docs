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
  const buildAuthorizer = require('./build-authorizer.js')
  return method => {
    const { authorizer, queryStringParameters, body } = method
    const authorizerData = require('./process-authorizer.js')(authorizer)
    return {
      ...method,
      authorizer: buildAuthorizer(modules, authorizerData),
      queryStringParameters: queryStringParameters.length > 0 ? buildTable(modules, queryStringParameters) : '',
      body: body.length > 0 ? buildTable(modules, body) : '',
      examples: buildExamples(method, endpoint, authorizerData)
    }
  }
}
