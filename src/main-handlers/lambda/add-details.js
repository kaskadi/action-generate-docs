const table = require('markdown-table')

module.exports = (fs, path) => {
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
  return ['sources', 'destinations', 'layers'].includes(key) ? 'l' : 'c'
}
