module.exports = (functions) => {
  return functions.map(processFunction)
}

function processFunction (lambda, layersMeta) {
  const { name, events, timeout, handler, destinations, layers } = lambda
  return {
    name,
    sources: events.length > 0 ? `<ul>${events.map(event => `<li>${getEventName(event)}</li>`).join('')}</ul>` : 'No source defined',
    timeout: timeout || 'default',
    handler,
    ...layers && { layers: `<ul>${layers.map(layer => `<li>${getLayerName(layer, layersMeta)}</li>`).join('')}</ul>` },
    ...destinations && { destinations: `<ul><li>On success: ${destinations.onSuccess}</li><li>On failure: ${destinations.onFailure}</li></ul>` }
  }
}

function getLayerName (layer, layersMeta) {
  const arnRegex = new RegExp(/arn:[a-zA-Z0-9-]+:lambda:[a-zA-Z0-9-]+:\d{12}:layer:([a-zA-Z0-9-_]+)|[a-zA-Z0-9-_]+/)
  const refRegex = new RegExp(/{([^}]*)}/)
  const matchArn = layer.match(arnRegex)
  const matchRef = layer.match(refRegex)
  if (matchRef) {
    const layerName = layersMeta[matchRef[1].replace('LambdaLayer', '').trim()].name
    return `[${layerName}](#${layerName})`
  }
  if (matchArn) {
    return `${matchArn[1]} (defined via ARN reference out of this stack)`
  }
  return layer
}

function getEventName (event) {
  const semEvent = camelToSentence(Object.keys(event)[0])
  return semEvent.split(' ').length === 1 ? semEvent.toUpperCase() : semEvent
}

function camelToSentence (str) {
  const sentenceCasedStr = str.replace(/([A-Z])/g, ' $1')
  return sentenceCasedStr.charAt(0).toUpperCase() + sentenceCasedStr.slice(1)
}
