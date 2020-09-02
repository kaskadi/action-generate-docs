const core = require('@actions/core')
const markshell = require('markshell')

const test = process.env.TEST_ENV ? JSON.parse(process.env.TEST_ENV) : false

const type = core.getInput('type', { required: true })
const templatePath = core.getInput('template')

require(`./helpers/${type}/index.js`)(templatePath)
try {
  console.log('\n********* Documentation preview *********\n')
  markshell.toConsole('README.md')
  console.log('\n********* END Documentation preview *********\n')
} catch (err) {
  console.log('ERROR: was not able to generate new documentation preview... This shouldn\'t impact the actual documentation.')
  console.log(err)
}
require('./helpers/push-docs.js')(test)
