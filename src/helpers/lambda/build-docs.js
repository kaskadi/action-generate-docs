const replaceInFile = require('../replace-in-file.js')
const table = require('markdown-table')

module.exports = ({ fs, path }, data, templatePath) => {
  let main = fs.readFileSync(path.join(__dirname, 'lambda-partial.md'), 'utf8')
  main = replaceInFile(main, 'description', data.description)
  const tableKeys = Object.keys(data.details)
  const detailsTable = table([
    tableKeys.map(key => key.charAt(0).toUpperCase() + key.slice(1)),
    tableKeys.map(key => getTableEntryValue(key, data.details))
  ],
  { align: tableKeys.map(getTableEntryAlign) })
  main = replaceInFile(main, 'details', detailsTable)
  if (!fs.existsSync(templatePath) || !templatePath) {
    return main
  }
  return replaceInFile(fs.readFileSync(templatePath, 'utf8'), 'main', main)
}

function getTableEntryValue (key, details) {
  const value = details[key]
  return key === 'handler' ? `[handler](./${value})` : value
}

function getTableEntryAlign (key) {
  return ['sources', 'destinations'].includes(key) ? 'c' : 'l'
}
