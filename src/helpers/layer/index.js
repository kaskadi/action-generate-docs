const modules = {
  fs: require('fs'),
  path: require('path'),
  YAML: require('yaml')
}

module.exports = templatePath => {
  console.log('INFO: retrieving layers data from serverless.yml file...')
  const layersData = require('../get-sls.js')(modules, __dirname).layers || {}
  const layers = Object.values(layersData)
  console.log('SUCCESS: extracted layer meta data!')
  const data = require('./get-packages.js')(modules, layers)
  console.log('INFO: generating documentation...')
  const docs = require('./build-docs.js')(modules, data, templatePath)
  console.log('SUCCESS: documentation successfully generated!')
  modules.fs.writeFileSync('README.md', docs, 'utf8')
}
