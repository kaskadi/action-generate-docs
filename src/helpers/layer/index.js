const fs = require('fs')

module.exports = templatePath => {
  console.log('INFO: retrieving meta data from layer package.json and serverless.yml file...')
  const { description, layerPath } = require('./get-meta.js')(fs)
  console.log('SUCCESS: extracted layer meta data!')
  const packages = require('./get-packages.js')(layerPath, fs)
  console.log('INFO: generating documentation...')
  const docs = require('./build-docs.js')(fs, { description, packages }, templatePath)
  console.log('SUCCESS: documentation successfully generated!')
  fs.writeFileSync('README.md', docs, 'utf8')
}
