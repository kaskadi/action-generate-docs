const modules = {
  fs: require('fs'),
  path: require('path'),
  replaceInFile: require('../../helpers/replace-in-file.js')
}
const getMain = require('./get-main.js')
const buildDocs = require('./build-docs.js')

module.exports = templatePath => {
  console.log('INFO: generating documentation from provided template and all JS files in repository...')
  const docs = buildDocs(modules, templatePath, getMain(modules))
  console.log('SUCCESS: documentation successfully generated!')
  modules.fs.writeFileSync('README.md', docs, 'utf8')
}
