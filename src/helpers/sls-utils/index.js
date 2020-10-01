module.exports = (modules, templatePath, type) => {
  require('../install-deps.js')()
  console.log('INFO: retrieving data from serverless.yml file...')
  const meta = require('./get-sls.js')(modules)
  console.log('SUCCESS: extracted meta data!')
  const data = {
    ...require('./get-data.js')(modules, meta, type),
    tags: meta.provider.tags
  }
  console.log('INFO: generating documentation...')
  const docs = require('./build-docs.js')(modules, data, templatePath, type)
  console.log('SUCCESS: documentation successfully generated!')
  modules.fs.writeFileSync('README.md', docs, 'utf8')
}
