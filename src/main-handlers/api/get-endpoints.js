module.exports = meta => {
  const getBaseUrl = require('../../helpers/sls-utils/get-base-url.js')
  const { functions } = meta
  const baseUrl = getBaseUrl(meta)
  return processEndpoints(getEndpoints(functions, baseUrl))
    .sort(sortEndpoints)
}

function sortEndpoints (a, b) {
  const pathA = a.path.toUpperCase()
  const pathB = b.path.toUpperCase()
  const pathALength = pathA.split('/').length
  const pathBLength = pathB.split('/').length
  if (pathALength === pathBLength) {
    return pathA < pathB ? -1 : 1 // paths will never be equal because we're grouping all similar paths under the same endpoint
  }
  return pathALength < pathBLength ? -1 : 1
}

function getEndpoints (functions, baseUrl) {
  return Object.values(functions).flatMap(lambda => {
    const { events } = lambda
    const httpEvents = events.filter(event => Object.keys(event)[0] === 'http').map(event => event.http)
    return httpEvents.map(getEventData(lambda, baseUrl))
  })
}

function processEndpoints (endpoints) {
  const paths = [...new Set(endpoints.map(endpoint => endpoint.path))]
  return paths.map(path => {
    const methods = endpoints
      .filter(endpoint => endpoint.path === path)
      .map(method => {
        delete method.path
        return method
      })
    path = path.charAt(0) === '/' ? path : `/${path}`
    return {
      name: path,
      path,
      methods
    }
  })
}

function getEventData (lambda, baseUrl) {
  return event => {
    const { name } = lambda
    const { path } = event
    let { method } = event
    const kaskadiDocs = event['kaskadi-docs'] || {}
    method = method.toUpperCase()
    return {
      name: method,
      anchor: `${path}-${method}`,
      'lambda-name': name,
      path,
      method,
      description: kaskadiDocs.description || '',
      queryStringParameters: kaskadiDocs.queryStringParameters || [],
      body: kaskadiDocs.body || [],
      examples: kaskadiDocs.examples || [],
      'base-url': baseUrl
    }
  }
}
