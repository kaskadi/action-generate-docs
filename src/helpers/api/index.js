const modules = {
  fs: require('fs'),
  path: require('path'),
  YAML: require('yaml')
}

module.exports = templatePath => {
  console.log('INFO: retrieving data from serverless.yml file...')
  const meta = require('../get-sls.js')(modules, __dirname)
  const functions = meta.functions || {}
  const layers = meta.layers || {}
  const data = {
    endpoints: require('./get-endpoints.js')(functions),
    functions: require('../lambda/process-meta.js')(functions, layers),
    layers: require('../layer/get-packages.js')(modules, layers)
  }
  console.log(data)
  // console.log('SUCCESS: extracted meta data!')
  // console.log('INFO: generating documentation...')
  // const docs = require('./build-docs.js')(modules, data, templatePath)
  // console.log('SUCCESS: documentation successfully generated!')
  // modules.fs.writeFileSync('README.md', docs, 'utf8')
}
