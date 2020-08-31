const fs = require('fs')

module.exports = templatePath => {
  const config = require('./parse-config.js')(fs)
  const docs = require('./build-docs.js')(fs, config, templatePath)
  fs.writeFileSync('README.md', docs, 'utf8')
}
