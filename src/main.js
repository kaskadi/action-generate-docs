const core = require('@actions/core')
const path = require('path')
const fs = require('fs')

const test = process.env.TEST_ENV ? JSON.parse(process.env.TEST_ENV) : false

const type = core.getInput('type', { required: true })
const templatePath = core.getInput('template')

if (!fs.existsSync(`${__dirname}/main-handlers/${type}`)) {
  console.log(`WARNING: ${type} is not a supported repository type... Please see action documentation for more information. Aborting job...`)
  process.exit(0)
}

const modulePath = `main-handlers/${type}`

require('./helpers/install-deps.js')(path.join(__dirname, modulePath))
require(`./${modulePath}/index.js`)(templatePath)
if (!test) {
  require('./helpers/push-docs.js')()
}
