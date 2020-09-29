function buildPartial (partialDoc, docType) {
  const replaceInFile = require('../replace-in-file.js')
  return data => Object.keys(data).reduce((partial, key) => replaceInFile(partial, key, data[key] || `No ${key} found for this ${docType}...`), partialDoc)
}

exports.getPartial = (fs, data, partialPath, docType) => {
  const partial = fs.readFileSync(partialPath, 'utf8')
  return data.map(buildPartial(partial, docType)).join('\n\n').trim()
}

exports.buildList = (arr, docType) => arr.length > 0
  ? arr.map(data => `- [${data.name}](#${data.name})`).join('\n')
  : `_no ${docType} defined in the configuration file..._`
