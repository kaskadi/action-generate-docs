module.exports = (functions, layersMeta) => {
  return functions.map(processFunction(layersMeta))
}

function processFunction (layersMeta) {
  return lambda => {
    const { name, events, timeout, handler, destinations, layers } = lambda
    return {
      name,
      sources: events.length > 0 ? `<ul>${events.map(event => `<li>${getEventName(event)}</li>`).join('')}</ul>` : 'No source defined',
      timeout: `${timeout}s` || 'default',
      handler,
      ...layers && { layers: `<ul>${layers.map(layer => `<li>${getLayerName(layer, layersMeta)}</li>`).join('')}</ul>` },
      ...destinations && { destinations: `<ul>${destinations.onSuccess ? `<li>On success: ${destinations.onSuccess}</li>` : ''}${destinations.onFailure ? `<li>On failure: ${destinations.onFailure}</li>` : ''}</ul>` }
    }
  }
}

function getLayerName (layer, layersMeta) {
  if (typeof layer === 'object' && layer !== null) {
    const entry = Object.entries(layer)[0]
    return processIntrinsicFct(entry[0], entry[1], layersMeta)
  }
  const arnRegex = new RegExp(/arn:[a-zA-Z0-9-]+:lambda:[a-zA-Z0-9-]+:\d{12}:layer:([a-zA-Z0-9-_]+)/)
  const matchArn = layer.match(arnRegex)
  console.log(matchArn)
  if (matchArn) {
    return `${matchArn[1]} _(defined via ARN: "${layer}")_`
  }
  return layer
}

function processIntrinsicFct (key, value, layersMeta) {
  switch (key) {
    case 'Ref': {
      const layerName = layersMeta[value.replace('LambdaLayer', '')].name
      return `[${layerName}](#${layerName})`
    }
    case 'Fn::Join':
      return value[1].join(value[0])
    default:
      // this case should pretty much never happen in production because then the reference to the layer would be wrong
      return JSON.stringify(value)
  }
}

function getEventName (event) {
  const semEvent = camelToSentence(Object.keys(event)[0])
  return semEvent.split(' ').length === 1 ? semEvent.toUpperCase() : semEvent
}

function camelToSentence (str) {
  const sentenceCasedStr = str.replace(/([A-Z])/g, ' $1')
  return sentenceCasedStr.charAt(0).toUpperCase() + sentenceCasedStr.slice(1)
}
