const modules = {
  fs: require('fs'),
  path: require('path'),
  YAML: require('yaml')
}

module.exports = templatePath => {
  console.log('INFO: retrieving lambda functions data from serverless.yml file...')
  const meta = require('../../helpers/get-sls.js')(modules, __dirname)
  const data = require('../../helpers/get-data.js')(modules, meta, 'lambda')
  console.log('SUCCESS: extracted lambda functions meta data!')
  console.log('INFO: generating documentation...')
  const docs = require('../../helpers/build-docs.js')(modules, data, templatePath, 'lambda')
  console.log('SUCCESS: documentation successfully generated!')
  modules.fs.writeFileSync('README.md', docs, 'utf8')
}
