module.exports = (functions) => {
  return Object.values(functions).map(processEndpoint)
}

function processEndpoint (lambda) {
  const { name, events } = lambda
  return {
    name,
    methods: events.filter(event => Object.keys(event)[0] === 'http').map(getEventData)
  }
}

function getEventData (event) {
  const data = event.http
  const { method, path } = data
  const kaskadiDocs = data['kaskadi-docs']
  const { description, queryStringParameters, body } = kaskadiDocs
  return {
    method,
    path,
    description,
    queryStringParameters,
    body
  }
}
