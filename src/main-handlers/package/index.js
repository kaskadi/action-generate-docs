const modules = {
  fs: require('fs'),
  replaceInFile: require('../../helpers/replace-in-file.js'),
  glob: require('glob'),
  jsdoc2md: require('jsdoc-to-markdown')
}

const path = require('path')

module.exports = templatePath => {
  console.log('INFO: generating documentation from provided template and all JS files in repository...')
  const data = {
    ...require('./get-data.js')(modules),
    ...require('../../helpers/jsdoc-utils/get-data.js')(modules)
  }
  const docs = require('../../helpers/jsdoc-utils/build-docs.js')(modules, data, path.join(__dirname, 'package-partial.md'), templatePath)
  console.log('SUCCESS: documentation successfully generated!')
  modules.fs.writeFileSync('README.md', docs, 'utf8')
}
