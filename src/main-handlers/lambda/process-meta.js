module.exports = (functions, layersMeta) => {
  return Object.values(functions).map(processFunction(layersMeta, functions))
}

function processFunction (layersMeta, functions) {
  return lambda => {
    const { name, events, timeout, handler, destinations, layers } = lambda
    return {
      name,
      sources: events.length > 0 ? `<ul>${events.map(event => `<li>${getEventName(event)}</li>`).join('')}</ul>` : 'No source defined',
      timeout: timeout ? `${timeout}s` : 'default',
      handler,
      ...layers && { layers: `<ul>${layers.map(layer => `<li>${getLayerName(layer, layersMeta)}</li>`).join('')}</ul>` },
      ...destinations && { destinations: `<ul>${destinations.onSuccess ? `<li>On success: ${getDestination(destinations.onSuccess, functions)}</li>` : ''}${destinations.onFailure ? `<li>On failure: ${getDestination(destinations.onFailure, functions)}</li>` : ''}</ul>` }
    }
  }
}

function getDestination (destination, functions) {
  if (typeof destination === 'object' && destination !== null) {
    const entry = Object.entries(destination)[0]
    return processIntrinsicFct(entry[0], entry[1], functions, 'lambda')
  }
  const regexps = {
    lambda: new RegExp(/arn:[a-zA-Z0-9-]+:lambda:[a-zA-Z0-9-]+:\d{12}:function:([a-zA-Z0-9-_]+)/),
    SQS: new RegExp(/arn:[a-zA-Z0-9-]+:sqs:[a-zA-Z0-9-]+:\d{12}:([a-zA-Z0-9-_]+)/),
    SNS: new RegExp(/arn:[a-zA-Z0-9-]+:sns:[a-zA-Z0-9-]+:\d{12}:([a-zA-Z0-9-_]+)/),
    eventBridge: new RegExp(/arn:[a-zA-Z0-9-]+:events:[a-zA-Z0-9-]+:\d{12}:event-bus\/([a-zA-Z0-9-_]+)/)
  }
  let i = 0
  let match = null
  const entries = Object.entries(regexps)
  while (!match && i < entries.length) {
    match = destination.match(entries[i][1])
    i++
  }
  return match ? `${match[1]} _(type: ${camelToSentence(entries[i - 1][0])}, defined via ARN)_` : `[${functions[destination].name}](#${functions[destination].name})`
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

function processIntrinsicFct (key, value, meta, type = 'layer') {
  switch (key) {
    case 'Ref': {
      if (type === 'lambda') {
        return `${value} _(referencing to \`${value}\` in CloudFormation stack via \`Ref\` intrinsic function)_`
      }
      const layerName = meta[value.replace('LambdaLayer', '')].name
      return `[${layerName}](#${layerName})`
    }
    case 'Fn::Join':
      return value[1].join(value[0])
    default:
      return `\`${key}: ${JSON.stringify(value)}\` _(defined via intrinsic function)_`
  }
}

function getEventName (event) {
  const semEvent = camelToSentence(Object.keys(event)[0])
  return semEvent.split(' ').length === 1 ? semEvent.toUpperCase() : semEvent
}

function camelToSentence (str) {
  const sentenceCasedStr = str.replace(/([a-z])([A-Z])/g, '$1 $2')
  return sentenceCasedStr.charAt(0).toUpperCase() + sentenceCasedStr.slice(1)
}
