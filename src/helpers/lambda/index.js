const modules = {
  fs: require('fs'),
  path: require('path'),
  YAML: require('yaml')
}

module.exports = templatePath => {
  console.log('INFO: retrieving lambda functions data from serverless.yml file...')
  const meta = require('../get-sls.js')(modules, __dirname)
  const data = {
    functions: require('./process-meta.js')(Object.values(meta.functions, meta.layers)),
    layers: require('../layer/get-packages.js')(modules, Object.values(meta.layers || {}))
  }
  console.log('SUCCESS: extracted lambda functions meta data!')
  console.log('INFO: generating documentation...')
  const docs = require('./build-docs.js')(modules, data, templatePath)
  console.log('SUCCESS: documentation successfully generated!')
  modules.fs.writeFileSync('README.md', docs, 'utf8')
}
