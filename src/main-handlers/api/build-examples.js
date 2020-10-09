module.exports = (method, endpoint, authorizerData) => {
  return method.examples
    .map(getExample(method, endpoint, authorizerData))
    .map((example, i) => `<details>\n<summary>Example #${i + 1}</summary>\n\n${example}\n</details>`)
    .join('\n\n')
}

function getExample (method, endpoint, authorizerData) {
  const { getExampleRequest, getExampleResponse } = exampleBuilders()
  return example => {
    let { request } = example
    const { response } = example
    request = addAuthorizerData(request, authorizerData)
    const formatExample = (type, example) => example.length > 0 ? `_${type}:_\n\n${example}\n\n` : ''
    const exampleRequest = formatExample('Request', getExampleRequest(method, endpoint, request))
    const exampleResponse = formatExample('Response', getExampleResponse(response))
    return exampleRequest + exampleResponse
  }
}

function addAuthorizerData (request, authorizerData) {
  if (Object.keys(authorizerData).length === 0) {
    return request
  }
  let heading
  let { headers, queryStringParameters } = request
  const { type } = authorizerData
  if (type === 'IAM') {
    heading = '**Warning:** the example request shown below does not include authorization via IAM. It gives you the base request expected by this endpoint (if it was not protected). You need to connect to this endpoint using an AWS signed request built with the proper IAM role. To know more about how to sign a request see [here](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html).'
  } else if (type === 'Cognito') {
    headers = { ...headers, Authorization: 'Bearer COGNITO_ACCESS_TOKEN' }
  } else {
    const { identitySource } = authorizerData
    const sources = identitySource.split(', ')
    const extractSourceType = prefix => sources.filter(source => source.startsWith(prefix)).map(key => key.replace(prefix, ''))
    const sourceToObject = sources => Object.fromEntries(sources.map(source => [source, `${source.toUpperCase()}_VALUE`]))
    headers = { ...headers, ...sourceToObject(extractSourceType('method.request.header.')) }
    queryStringParameters = { ...queryStringParameters, ...sourceToObject(extractSourceType('method.request.queryStringParameter.')) }
  }
  return { ...request, headers, queryStringParameters, heading }
}

function exampleBuilders () {
  const getBody = (body = '') => typeof body === 'string' ? body : JSON.stringify(body, null, 2)
  const mapToString = (obj = {}, sep, col) => Object.entries(obj).map(entry => entry[0] + sep + entry[1]).join(col)
  const formatNamedData = (heading, data) => data && String(data).length > 0 ? `${heading}:\n${data}` : ''
  const formatBlock = (block, heading) => `${heading ? `${heading}\n\n` : ''}\`\`\`HTTP\n${block.trim()}\n\`\`\``
  return {
    getExampleRequest: (method, endpoint, request) => {
      if (!request) {
        return ''
      }
      const { body, queryStringParameters, headers } = request
      let qs = mapToString(queryStringParameters, '=', '&')
      qs = qs.length > 0 ? `?${qs}` : qs
      const exampleReq = `${method.method} ${method['base-url']}${endpoint.path}${qs}\n\n${formatNamedData('Headers', mapToString(headers, ': ', '\n'))}\n\n${formatNamedData('Body', getBody(body))}`
      return formatBlock(exampleReq, request.heading)
    },
    getExampleResponse: (response) => {
      if (!response) {
        return ''
      }
      const { body, statusCode, headers } = response
      const exampleRes = `${formatNamedData('Status code', statusCode)}\n\n${formatNamedData('Headers', mapToString(headers, ': ', '\n'))}\n\n${formatNamedData('Body', getBody(body))}`
      return formatBlock(exampleRes)
    }
  }
}
