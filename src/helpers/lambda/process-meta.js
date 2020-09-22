module.exports = (functions) => {
  return functions.map(processFunction)
}

function processFunction (lambda) {
  const { name, events, timeout, handler, destinations } = lambda
  return {
    name,
    sources: events.length > 0 ? `<ul>${events.map(event => `<li>${getEventName(event)}</li>`).join('')}</ul>` : 'No source defined',
    timeout: timeout || 'default',
    handler,
    ...destinations && { destinations: `<ul><li>On success: ${destinations.onSuccess}</li><li>On failure: ${destinations.onFailure}</li></ul>` }
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
