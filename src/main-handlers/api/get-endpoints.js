module.exports = (functions) => {
  return Object.values(functions).map(processEndpoint)
}

function processEndpoint (lambda) {
  const { name, events } = lambda
  const httpEvents = events.filter(event => Object.keys(event)[0] === 'http').map(event => event.http)
  const path = `/${httpEvents[0].path}` // we cannot have different paths calling the same lambda: bad API design. At best we would have different methods with the same path (DELETE, GET, POST)
  return {
    name: path, // we want to use path here to be able to reference the proper endpoint in the documentation
    'lambda-name': name, // this helps us reference to the lambda attached to this endpoint
    path,
    methods: httpEvents.map(getEventData)
  }
}

function getEventData (event) {
  let { method } = event
  const kaskadiDocs = event['kaskadi-docs'] || {}
  method = method.toUpperCase()
  return {
    name: method,
    method,
    description: kaskadiDocs.description || '',
    queryStringParameters: kaskadiDocs.queryStringParameters || [],
    body: kaskadiDocs.body || []
  }
}
