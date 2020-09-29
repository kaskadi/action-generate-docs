const table = require('markdown-table')

module.exports = endpoints => {
  return endpoints.map(processEndpoint)
}

function processEndpoint (endpoint) {
  return {
    ...endpoint,
    methods: endpoint.methods.map(processMethod)
  }
}

function processMethod (method) {
  return {
    ...method,
    queryStringParameters: buildTable(method.queryStringParameters),
    body: buildTable(method.body),
    example: '```\nplaceholder\n```'
  }
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
