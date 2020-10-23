module.exports = (method, endpoint, authorizerData) => {
  return method.examples
    .map(getExample(method, endpoint, authorizerData))
    .map((example, i) => `<details>\n<summary>Example #${i + 1}</summary>\n\n${example}\n</details>`)
    .join('\n\n')
}

function getExample (method, endpoint, authorizerData) {
  return example => {
    let { request } = example
    const { response } = example
    request = addAuthorizerData(request, authorizerData)
    const exampleRequest = buildExampleRequest(method, endpoint, request)
    const exampleResponse = buildExampleResponse(response)
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
    headers = { ...headers, Authorization: 'Bearer COGNITO_ACCESS_TOKEN' } // lgtm [js/hardcoded-credentials]
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

// helpers for building example request and response
function replacePathParams (path, pathParams = {}) {
  return Object.entries(pathParams)
    .reduce((reducedPath, entry) => {
      let key = entry[0]
      if (key.slice(-1) === '+') {
        // if the parameters ends with + that means we're dealing with a proxy so we will have to escape + to avoid any errors when replacing
        key = key.slice(0, -1) + '\\' + key.slice(-1)
      }
      const regExp = new RegExp(`{${key}}`, 'g')
      return reducedPath.replace(regExp, entry[1])
    }, path)
}

function getBody (body = '') {
  return typeof body === 'string' ? body : JSON.stringify(body, null, 2)
}

function mapToString (obj = {}, sep, col) {
  return Object.entries(obj).map(entry => entry[0] + sep + entry[1]).join(col)
}

function formatNamedData (heading, data = '') {
  data = String(data).replace(/\\n/g, '\n')
  return data.length > 0
    ? `${heading}:\n${data.split('\n').map(line => '  ' + line).join('\n')}`
    : ''
}

function formatBlock (type, block) {
  return `_${type}:_\n\n\`\`\`HTTP\n${block.trim()}\n\`\`\`\n\n`
}

function formatExample (example, heading) {
  return heading ? `${heading}\n\n${example}` : example
}

function buildExampleRequest (method, endpoint, request) {
  if (!request) {
    return ''
  }
  const { body, queryStringParameters, pathParameters, headers } = request
  let qs = mapToString(queryStringParameters, '=', '&')
  qs = qs.length > 0 ? `?${qs}` : qs
  const exampleReq = `${method.method} ${method['base-url']}${replacePathParams(endpoint.path, pathParameters)}${qs}\n\n${formatNamedData('Headers', mapToString(headers, ': ', '\n'))}\n\n${formatNamedData('Body', getBody(body))}`
  return formatExample(formatBlock('Request', exampleReq), request.heading)
}

function buildExampleResponse (response) {
  if (!response) {
    return ''
  }
  const { body, statusCode, headers } = response
  const exampleRes = `${formatNamedData('Status code', statusCode)}\n\n${formatNamedData('Headers', mapToString(headers, ': ', '\n'))}\n\n${formatNamedData('Body', getBody(body))}`
  return formatExample(formatBlock('Response', exampleRes))
}
