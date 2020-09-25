module.exports = (functions, layersMeta) => {
  return functions.map(processFunction(layersMeta, functions))
}

function processFunction (layersMeta, functions) {
  return lambda => {
    const { name, events, timeout, handler, destinations, layers } = lambda
    return {
      name,
      sources: events.length > 0 ? `<ul>${events.map(event => `<li>${getEventName(event)}</li>`).join('')}</ul>` : 'No source defined',
      timeout: `${timeout}s` || 'default',
      handler,
      ...layers && { layers: `<ul>${layers.map(layer => `<li>${getLayerName(layer, layersMeta)}</li>`).join('')}</ul>` },
      ...destinations && { destinations: `<ul>${destinations.onSuccess ? `<li>On success: ${getDestination(destinations.onSuccess, functions)}</li>` : ''}${destinations.onFailure ? `<li>On failure: ${getDestination(destinations.onFailure, functions)}</li>` : ''}</ul>` }
    }
  }
}

function getDestination (destination, functions) {
  if (typeof destination === 'string') {
    // the only valid definition when using directly a string is to refer to a lambda function part of the same stack!
    const lambdaName = functions[destination].name
    return `[${lambdaName}](#${lambdaName})`
  }
  const regexps = [
    new RegExp(/arn:[a-zA-Z0-9-]+:lambda:[a-zA-Z0-9-]+:\d{12}:function:([a-zA-Z0-9-_]+)/), // lambda
    new RegExp(/arn:[a-zA-Z0-9-]+:sqs:[a-zA-Z0-9-]+:\d{12}:([a-zA-Z0-9-_]+)/), // SQS
    new RegExp(/arn:[a-zA-Z0-9-]+:sns:[a-zA-Z0-9-]+:\d{12}:([a-zA-Z0-9-_]+)/), // SNS
    new RegExp(/arn:[a-zA-Z0-9-]+:events:[a-zA-Z0-9-]+:\d{12}:event-bus\/([a-zA-Z0-9-_]+)/) // Event bridge bus
  ]
  let i = 0
  let match = null
  while (!match && i < regexps.length) {
    match = destination.match(regexps[i])
    i++
  }
  return match || destination
}

function getLayerName (layer, layersMeta) {
  if (typeof layer === 'object' && layer !== null) {
    const entry = Object.entries(layer)[0]
    return processIntrinsicFct(entry[0], entry[1], layersMeta)
  }
  const arnRegex = new RegExp(/arn:[a-zA-Z0-9-]+:lambda:[a-zA-Z0-9-]+:\d{12}:layer:([a-zA-Z0-9-_]+)/)
  const matchArn = layer.match(arnRegex)
  if (matchArn) {
    return `${matchArn[1]} _(defined via ARN)_`
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
