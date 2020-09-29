const modules = {
  fs: require('fs'),
  path: require('path'),
  YAML: require('yaml')
}

module.exports = templatePath => {
  console.log('INFO: retrieving data from serverless.yml file...')
  const meta = require('../get-sls.js')(modules, __dirname)
  const data = require('../get-data.js')(modules, meta, 'api')
  console.log('SUCCESS: extracted meta data!')
  console.log('INFO: generating documentation...')
  const docs = require('../build-docs.js')(modules, data, templatePath, 'api')
  console.log('SUCCESS: documentation successfully generated!')
  console.log(docs)
  // modules.fs.writeFileSync('README.md', docs, 'utf8')
}
