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
  return method => {
    return {
      ...method,
      queryStringParameters: method.queryStringParameters.length > 0 ? buildTable(modules, method.queryStringParameters) : '',
      body: method.body.length > 0 ? buildTable(modules, method.body) : '',
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

function buildTable ({ table }, params) {
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
