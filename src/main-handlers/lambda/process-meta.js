const camelToSentence = require('../../helpers/camel-to-sentence.js')

module.exports = meta => {
  const { layers, functions } = meta
  return Object.values(functions).map(processFunction(layers, functions))
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
    return processIntrinsicFct(destination, functions, 'lambda')
  }
  const regexps = {
    lambda: new RegExp(/arn:[a-zA-Z0-9-]+:lambda:[a-zA-Z0-9-]+:\d{12}:function:([a-zA-Z0-9-_]+)/),
    SQS: new RegExp(/arn:[a-zA-Z0-9-]+:sqs:[a-zA-Z0-9-]+:\d{12}:([a-zA-Z0-9-_]+)/),
    SNS: new RegExp(/arn:[a-zA-Z0-9-]+:sns:[a-zA-Z0-9-]+:\d{12}:([a-zA-Z0-9-_]+)/),
    eventBridge: new RegExp(/arn:[a-zA-Z0-9-]+:events:[a-zA-Z0-9-]+:\d{12}:event-bus\/([a-zA-Z0-9-_]+)/)
  }
  const { match, type } = findRegexMatch(destination, regexps)
  return match ? `${match[1]} _(type: ${camelToSentence(type)}, defined via ARN)_` : `[${functions[destination].name}](#${functions[destination].name})`
}

function findRegexMatch (destination, regexps) {
  let match = null
  let type = ''
  for (const key in regexps) {
    match = destination.match(regexps[key])
    if (match) {
      type = key
      break
    }
  }
  type = capitalizeName(camelToSentence(type))
  return { match, type }
}

function getLayerName (layer, layersMeta) {
  if (typeof layer === 'object' && layer !== null) {
    return processIntrinsicFct(layer, layersMeta)
  }
  const arnRegex = new RegExp(/arn:[a-zA-Z0-9-]+:lambda:[a-zA-Z0-9-]+:\d{12}:layer:([a-zA-Z0-9-_]+)/)
  const matchArn = layer.match(arnRegex)
  if (matchArn) {
    return `${matchArn[1]} _(defined via ARN)_`
  }
  return layer
}

function processIntrinsicFct (intrinsicData, meta, type = 'layer') {
  const fct = Object.keys(intrinsicData)[0]
  const value = intrinsicData[fct]
  switch (fct) {
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
      return `\`${fct}: ${JSON.stringify(value)}\` _(defined via intrinsic function)_`
  }
}

function getEventName (event) {
  const semEvent = camelToSentence(Object.keys(event)[0])
  return capitalizeName(semEvent)
}

function capitalizeName (str) {
  return str.split(' ').length === 1 ? str.toUpperCase() : str
}
