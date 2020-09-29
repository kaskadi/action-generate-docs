const path = require('path')
const modules = {
  fs: require('fs'),
  path,
  YAML: require('yaml'),
  slsCli: path.join(__dirname, 'node_modules/serverless/bin/serverless.js')
}

module.exports = templatePath => {
  require('../../helpers/sls-utils/index.js')(modules, templatePath, 'api')
}
