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
      ...buildExample(method, endpoint)
    }
  }
}

function buildExample (methodData, endpoint) {
  const { request, response } = methodData.example
  const getBody = body => body ? typeof body === 'string' ? body : JSON.stringify(body, null, 2) : ''
  const getHeaders = headers => headers ? Object.entries(headers).map(entry => `${entry[0]}: ${entry[1]}`).join('\n') : ''
  const formatBlock = (heading, data) => data.length > 0 ? `\n\n${heading}:\n${data}` : ''
  const formatExample = example => `\`\`\`HTTP\n${example}\n\`\`\``
  let example = {}
  if (request) {
    const { body, queryStringParameters, headers } = request
    let qs = queryStringParameters ? Object.entries(queryStringParameters).map(entry => `${entry[0]}=${entry[1]}`).join('&') : ''
    qs = qs.length > 0 ? `?${qs}` : qs
    const exampleReq = formatExample(`${methodData.method} ${endpoint.path}${qs}${formatBlock('Headers', getHeaders(headers))}${formatBlock('Body', getBody(body))}`)
    example = {
      ...example,
      'example-request': exampleReq
    }
  }
  if (response) {
    const { body, statusCode, headers } = response
    const exampleRes = formatExample(`Status code:\n${statusCode}${formatBlock('Headers', getHeaders(headers))}${formatBlock('Body', getBody(body))}`)
    example = {
      ...example,
      'example-response': exampleRes
    }
  }
  return example
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
