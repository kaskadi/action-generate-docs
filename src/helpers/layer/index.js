const modules = {
  fs: require('fs'),
  path: require('path')
}

module.exports = templatePath => {
  console.log('INFO: retrieving meta data from layer package.json and serverless.yml file...')
  const { description, layerPath } = require('./get-meta.js')(modules)
  console.log('SUCCESS: extracted layer meta data!')
  const packages = require('./get-packages.js')(modules, layerPath)
  console.log('INFO: generating documentation...')
  const docs = require('./build-docs.js')(modules, { description, packages }, templatePath)
  console.log('SUCCESS: documentation successfully generated!')
  modules.fs.writeFileSync('README.md', docs, 'utf8')
}
