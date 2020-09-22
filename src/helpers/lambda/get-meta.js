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
      sources: lambdaConfig.events ? lambdaConfig.events.map(event => `- ${camelToSentence(Object.keys(event)[0])}`).join('\n') : [],
      timeout: lambdaConfig.timeout || 'default',
      handler: lambdaConfig.handler,
      destinations: lambdaConfig.destinations ? `- On success: ${lambdaConfig.destinations.onSuccess}\n- On failure: ${lambdaConfig.destinations.onFailure}` : undefined
    }
  }
}

function camelToSentence (str) {
  const sentenceCasedStr = str.replace(/([A-Z])/g, ' $1')
  return sentenceCasedStr.charAt(0).toUpperCase() + sentenceCasedStr.slice(1)
}
