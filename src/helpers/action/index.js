const fs = require('fs')

module.exports = templatePath => {
  console.log('INFO: reading action configuration file...')
  const config = require('./parse-config.js')(fs)
  console.log('SUCCESS: extracted action configuration!')
  console.log('INFO: generating documentation...')
  const docs = require('./build-docs.js')(fs, config, templatePath)
  console.log('SUCCESS: documentation successfully generated!')
  fs.writeFileSync('README.md', docs, 'utf8')
}
