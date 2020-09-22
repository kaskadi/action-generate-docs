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
  const splitHandler = handler.split('.')
  const fileName = splitHandler.slice(0, splitHandler.length - 1).join('.')
  const root = path.dirname(fileName)
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter(dirent => !dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(file => file.includes(fileName))[0]
}

function getTableEntryAlign (key) {
  return ['sources', 'destinations'].includes(key) ? 'l' : 'c'
}
