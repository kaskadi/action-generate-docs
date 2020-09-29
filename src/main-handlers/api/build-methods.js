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
      queryStringParameters: method.queryStringParameters.length > 0 ? buildTable(method.queryStringParameters) : '',
      body: method.body.length > 0 ? buildTable(method.body) : '',
      example: buildExample(method, endpoint)
    }
  }
}

function buildExample (methodData, endpoint) {
  const { method, queryStringParameters, body } = methodData
  let qs = queryStringParameters.map(param => `${param.key}=${param.key}_value`).join('&')
  qs = qs.length > 0 ? `?${qs}` : qs
  const payload = Object.fromEntries(body.map(param => [param.key, `${param.key}_value`]))
  const reqBody = Object.keys(payload).length > 0 ? `\n\n${JSON.stringify(payload, null, 2)}` : ''
  const example = `${method} ${endpoint.path}${qs}${reqBody}`
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
