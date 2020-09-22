const replaceInFile = require('../replace-in-file.js')
const table = require('markdown-table')
const buildLambdaList = require('../build-list.js')
const buildLambdaDocs = require('../build-partial.js')

module.exports = ({ fs, path }, data, templatePath) => {
  let main = fs.readFileSync(path.join(__dirname, 'main-partial.md'), 'utf8')
  const lambdaPartial = fs.readFileSync(path.join(__dirname, 'lambda-partial.md'), 'utf8')
  data = data.map(addDetails(fs, path))
  const lambdas = data.map(buildLambdaDocs(lambdaPartial, 'lambda function')).join('\n\n').trim()
  main = replaceInFile(main, 'lambdas', lambdas)
  main = replaceInFile(main, 'lambdas-list', buildLambdaList(data))
  if (!fs.existsSync(templatePath) || !templatePath) {
    return main
  }
  return replaceInFile(fs.readFileSync(templatePath, 'utf8'), 'main', main)
}

function addDetails (fs, path) {
  return lambda => {
    const detailsKeys = Object.keys(lambda)
    const details = table([
      detailsKeys.map(key => key.charAt(0).toUpperCase() + key.slice(1)),
      detailsKeys.map(key => getTableEntryValue(key, lambda, fs, path))
    ],
    { align: detailsKeys.map(getTableEntryAlign) })
    return {
      ...lambda,
      details
    }
  }
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
