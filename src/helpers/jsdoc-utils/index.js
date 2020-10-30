module.exports = (moduleDir, templatePath, type) => {
  const modules = loadModuleDeps(moduleDir, type)
  console.log('INFO: generating documentation from provided template and appropriated JS files in repository...')
  const data = {
    ...require('./get-data.js')(modules, type),
    ...require(`${moduleDir}/get-data.js`)(modules)
  }
  const docs = require('./build-docs.js')(modules, data, `${moduleDir}/${type}-partial.md`, templatePath)
  console.log('SUCCESS: documentation successfully generated!')
  modules.fs.writeFileSync('README.md', docs, 'utf8')
}

function loadModuleDeps (moduleDir, type) {
  const modules = {
    fs: require('fs'),
    replaceInFile: require('../replace-in-file.js'),
    glob: require(`${moduleDir}/node_modules/glob`),
    jsdoc2md: require(`${moduleDir}/node_modules/jsdoc-to-markdown`),
    ...(type === 'element' && { table: require(`${moduleDir}/node_modules/markdown-table`) })
  }
  return modules
}
