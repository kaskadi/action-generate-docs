const core = require('@actions/core')

const type = core.getInput('type')
const templatePath = core.getInput('template')

require(`./helpers/${type}/index.js`)(templatePath)
