const modules = {
  fs: require('fs'),
  path: require('path')
}

module.exports = templatePath => {
  console.log('INFO: retrieving meta data from lambda package.json and serverless.yml file...')
  const meta = require('./get-meta.js')(modules)
  console.log('SUCCESS: extracted lambda meta data!')
  console.log('INFO: generating documentation...')
  const docs = require('./build-docs.js')(modules, meta, templatePath)
  console.log('SUCCESS: documentation successfully generated!')
  modules.fs.writeFileSync('README.md', docs, 'utf8')
}
