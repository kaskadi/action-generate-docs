const table = require('markdown-table')

module.exports = endpoints => {
  return endpoints.map(processEndpoint)
}

function processEndpoint (endpoint) {
  return {
    ...endpoint,
    methods: endpoint.methods.map(processMethod(endpoint))
  }
}

function processMethod (endpoint) {
  return method => {
    return {
      ...method,
      queryStringParameters: buildTable(method.queryStringParameters),
      body: buildTable(method.body),
      example: buildExample(method, endpoint)
    }
  }
}

function buildExample (methodData, endpoint) {
  const { method, queryStringParameters, body } = methodData
  const qs = queryStringParameters.map(param => `${param.key}=${param.key}_value`).join('&')
  const reqBody = Object.fromEntries(body.map(param => [param.key, `${param.key}_value`]))
  const example = `${method} ${endpoint.path}?${qs}\n\n${JSON.stringify(reqBody, null, 2)}`
  return `\`\`\`HTTP\n${example}\n\`\`\``
}

function buildTable (params) {
  const headers = ['key', 'default', 'description']
  return table([
    headers.map(header => header.charAt(0).toUpperCase() + header.slice(1)),
    ...params.map(buildLine(headers))
  ],
  { align: headers.map(header => header === 'description' ? 'l' : 'c') }
  )
}

function buildLine (headers) {
  return param => headers.map(header => {
    if (!param[header]) {
      return ''
    }
    if (header === 'key' || header === 'default') {
      return `\`${param[header]}\``
    }
    return param[header]
  })
}
