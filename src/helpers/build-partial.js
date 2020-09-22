const replaceInFile = require('./replace-in-file.js')

module.exports = partialDoc => {
  return data => Object.keys(data).reduce((partial, key) => replaceInFile(partial, key, data[key] || `No ${key} found for this lambda function...`), partialDoc)
}
