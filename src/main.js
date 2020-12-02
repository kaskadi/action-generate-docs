const { getInput, startGroup, endGroup, warning } = require('@actions/core')
const path = require('path')
const fs = require('fs')

const type = getInput('type', { required: true })
const templatePath = getInput('template')

if (!fs.existsSync(`${__dirname}/main-handlers/${type}`)) {
  const warningMsg = `${type} is not a supported repository type... Please see action documentation for more information.`
  warning(warningMsg)
  console.log(`WARNING: ${warningMsg} Aborting job...`)
  process.exit(0)
}

const modulePath = `main-handlers/${type}`

startGroup(`Installing ${type} documentation generation module dependencies`)
require('./helpers/install-deps.js')(path.join(__dirname, modulePath))
endGroup()
startGroup('Generating documentation for repository')
require(`./${modulePath}/index.js`)(templatePath)
endGroup()
startGroup('Adding new documentation to repository')
require('./helpers/push-docs.js')()
endGroup()
