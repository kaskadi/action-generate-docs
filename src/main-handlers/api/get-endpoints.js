module.exports = meta => {
  const { functions } = meta
  return processEndpoints(getEndpoints(functions))
    .sort(sortEndpoints)
}

function sortEndpoints (a, b) {
  const pathA = a.path.toUpperCase()
  const pathB = b.path.toUpperCase()
  const pathALength = pathA.split('/').length
  const pathBLength = pathB.split('/').length
  if (pathALength === pathBLength) {
    return pathA < pathB ? -1 : pathA > pathB ? 1 : 0
  }
  return pathALength < pathBLength ? -1 : pathALength > pathBLength ? 1 : 0
}

function getEndpoints (functions) {
  return Object.values(functions).flatMap(lambda => {
    const { events } = lambda
    const httpEvents = events.filter(event => Object.keys(event)[0] === 'http').map(event => event.http)
    return httpEvents.map(getEventData(lambda))
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
    path = path === '/' ? path : `/${path}`
    return {
      name: path,
      path,
      methods
    }
  })
}

function getEventData (lambda) {
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
      body: kaskadiDocs.body || []
    }
  }
}
