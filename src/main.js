const core = require('@actions/core')

const test = !process.env.GITHUB_ACTIONS || process.env.GITHUB_REPOSITORY === 'kaskadi/action-generate-docs'

const type = core.getInput('type', { required: true })
const templatePath = core.getInput('template')

require(`./helpers/${type}/index.js`)(templatePath)
require('./helpers/push-docs.js')(test)
