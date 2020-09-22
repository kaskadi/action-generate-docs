const replaceInFile = require('../replace-in-file.js')
const table = require('markdown-table')

module.exports = ({ fs, path }, data, templatePath) => {
  let main = fs.readFileSync(path.join(__dirname, 'lambda-partial.md'), 'utf8')
  main = replaceInFile(main, 'description', data.description)
  const tableKeys = Object.keys(data.details)
  const detailsTable = table([
    tableKeys.map(key => key.charAt(0).toUpperCase() + key.slice(1)),
    tableKeys.map(key => getTableEntryValue(key, data.details, fs, path))
  ],
  { align: tableKeys.map(getTableEntryAlign) })
  main = replaceInFile(main, 'details', detailsTable)
  if (!fs.existsSync(templatePath) || !templatePath) {
    return main
  }
  return replaceInFile(fs.readFileSync(templatePath, 'utf8'), 'main', main)
}

function getTableEntryValue (key, details, fs, path) {
  const value = details[key]
  return key === 'handler' ? `[handler](./${findHandler(value, fs, path)})` : value
}

function findHandler (handler, fs, path) {
  const baseFileName = path.basename(handler).split('.')[0] // handler contains a reference to the export but misses the extension of the file for referencing
  const filePath = path.dirname(handler)
  const fileName = fs
    .readdirSync(filePath, { withFileTypes: true })
    .filter(dirent => !dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(file => file.includes(baseFileName))[0]
  return path.join(filePath, fileName)
}

function getTableEntryAlign (key) {
  return ['sources', 'destinations'].includes(key) ? 'l' : 'c'
}
