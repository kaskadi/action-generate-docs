module.exports = (functions) => {
  return Object.values(functions).map(processEndpoint)
}

function processEndpoint (lambda) {
  const { name, events } = lambda
  return {
    name,
    methods: events.map(getEventData).filter(method => method)
  }
}

function getEventData (event) {
  const data = event.http
  if (!data) {
    return
  }
  const { method, path } = data
  const kaskadiDocs = data['kaskadi-docs']
  return {
    method: method.toUpperCase(),
    path,
    ...kaskadiDocs && {
      description: kaskadiDocs.description,
      queryStringParameters: kaskadiDocs.queryStringParameters,
      body: kaskadiDocs.body
    }
  }
}
