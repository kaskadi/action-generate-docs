module.exports = (method, endpoint) => {
  return method.examples
    .map(getExample(method, endpoint))
    .map((example, i) => `<details>\n<summary>Example #${i + 1}</summary>\n\n${example}\n</details>`)
    .join('\n\n')
}

function getExample (method, endpoint) {
  const { getExampleRequest, getExampleResponse } = exampleBuilders()
  return example => {
    const { request, response } = example
    const formatExample = (type, example) => example.length > 0 ? `_${type}:_\n\n${example}\n\n` : ''
    const exampleRequest = formatExample('Request', getExampleRequest(method, endpoint, request))
    const exampleResponse = formatExample('Response', getExampleResponse(response))
    return exampleRequest + exampleResponse
  }
}

function exampleBuilders () {
  const getBody = body => body ? typeof body === 'string' ? body : JSON.stringify(body, null, 2) : ''
  const getHeaders = headers => headers ? Object.entries(headers).map(entry => `${entry[0]}: ${entry[1]}`).join('\n') : ''
  const formatNamedData = (heading, data) => data.length > 0 ? `${heading}:\n${data}` : ''
  const formatBlock = block => `\`\`\`HTTP\n${block}\n\`\`\``
  return {
    getExampleRequest: (method, endpoint, request) => {
      if (!request) {
        return ''
      }
      const { body, queryStringParameters, headers } = request
      let qs = queryStringParameters ? Object.entries(queryStringParameters).map(entry => `${entry[0]}=${entry[1]}`).join('&') : ''
      qs = qs.length > 0 ? `?${qs}` : qs
      return formatBlock(`${method.method} ${endpoint.path}${qs}\n\n${formatNamedData('Headers', getHeaders(headers))}\n\n${formatNamedData('Body', getBody(body))}`)
    },
    getExampleResponse: (response) => {
      if (!response) {
        return ''
      }
      const { body, statusCode, headers } = response
      return formatBlock(`Status code:\n${statusCode}\n\n${formatNamedData('Headers', getHeaders(headers))}\n\n${formatNamedData('Body', getBody(body))}`)
    }
  }
}
