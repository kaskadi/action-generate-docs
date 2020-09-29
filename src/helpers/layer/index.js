const modules = {
  fs: require('fs'),
  path: require('path'),
  YAML: require('yaml')
}

module.exports = templatePath => {
  console.log('INFO: retrieving layers data from serverless.yml file...')
  const meta = require('../get-sls.js')(modules, __dirname)
  console.log('SUCCESS: extracted layer meta data!')
  const data = require('../get-data.js')(modules, meta, 'layer')
  console.log('INFO: generating documentation...')
  const docs = require('../build-docs.js')(modules, data, templatePath, 'layer')
  console.log('SUCCESS: documentation successfully generated!')
  modules.fs.writeFileSync('README.md', docs, 'utf8')
}
