const modules = {
  fs: require('fs'),
  path: require('path'),
  YAML: require('yaml')
}

module.exports = templatePath => {
  console.log('INFO: retrieving lambda functions data from serverless.yml file...')
  const meta = require('../../helpers/sls-utils/get-sls.js')(modules, __dirname)
  console.log('SUCCESS: extracted lambda functions meta data!')
  const data = require('../../helpers/sls-utils/get-data.js')(modules, meta, 'lambda')
  console.log('INFO: generating documentation...')
  const docs = require('../../helpers/sls-utils/build-docs.js')(data, templatePath, 'lambda')
  console.log('SUCCESS: documentation successfully generated!')
  modules.fs.writeFileSync('README.md', docs, 'utf8')
}
