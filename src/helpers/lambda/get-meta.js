const YAML = require('yaml')
const getSls = require('../get-sls.js')
const snakeToCamel = require('../snake-to-camel.js')

module.exports = ({ fs }) => {
  const { name, description } = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const lambdaName = snakeToCamel(name)
  const sls = getSls(YAML, __dirname)
  const lambdaConfig = sls.functions[lambdaName]
  return {
    description: description.length > 0 ? description : 'No description found in package.json...',
    details: {
      name,
      sources: lambdaConfig.events.length > 0 ? `<ul>${lambdaConfig.events.map(event => `<li>${getEventName(event)}</li>`).join('')}</ul>` : 'No source defined',
      timeout: lambdaConfig.timeout || 'default',
      handler: lambdaConfig.handler,
      ...lambdaConfig.destinations && { destinations: `<ul><li>On success: ${lambdaConfig.destinations.onSuccess}</li><li>On failure: ${lambdaConfig.destinations.onFailure}</li></ul>` }
    }
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
