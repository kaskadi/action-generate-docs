module.exports = (moduleDir, templatePath, type) => {
  const modules = loadModuleDeps(moduleDir)
  require('../install-deps.js')()
  console.log('INFO: retrieving data from serverless.yml file...')
  const meta = require('./get-sls.js')(modules)
  console.log('SUCCESS: extracted meta data!')
  const data = {
    ...require('./get-data.js')(modules, meta, type),
    'base-url': require('./get-base-url.js')(meta),
    tags: meta.provider.tags
  }
  console.log('INFO: generating documentation...')
  const docs = require('./build-docs.js')(modules, data, templatePath, type)
  console.log('SUCCESS: documentation successfully generated!')
  modules.fs.writeFileSync('README.md', docs, 'utf8')
}

function loadModuleDeps (moduleDir) {
  const path = require('path')
  const modules = {
    fs: require('fs'),
    path,
    YAML: require(`${moduleDir}/node_modules/yaml`),
    slsCli: path.join(moduleDir, 'node_modules/serverless/bin/serverless.js'),
    table: require(`${moduleDir}/node_modules/markdown-table`)
  }
  return modules
}
