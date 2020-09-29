const fs = require('fs')
const path = require('path')

const handlersDir = path.join(__dirname, '../../main-handlers')
const docTypes = {
  layers: {
    docType: 'layer',
    partialPath: path.join(handlersDir, 'layer/layer-partial.md')
  },
  lambdas: {
    docType: 'lambda function',
    partialPath: path.join(handlersDir, 'lambda/lambda-partial.md')
  },
  methods: {
    docType: 'method',
    partialPath: path.join(handlersDir, 'api/method-partial.md')
  },
  endpoints: {
    docType: 'endpoint',
    partialPath: path.join(handlersDir, 'api/endpoint-partial.md')
  }
}

module.exports = (data, type) => {
  var partials = {}
  const { docType, partialPath } = docTypes[type]
  partials[type] = getPartial(data, partialPath, docType)
  partials[`${type}-list`] = buildList(data, docType)
  return partials
}

function buildPartial (partialDoc, docType) {
  const replaceInFile = require('../replace-in-file.js')
  return data => Object.keys(data).reduce((partial, key) => replaceInFile(partial, key, data[key] || `No ${key} found for this ${docType}...`), partialDoc)
}

function getPartial (data, partialPath, docType) {
  const partial = fs.readFileSync(partialPath, 'utf8')
  return data.map(buildPartial(partial, docType)).join('\n\n').trim()
}

function buildList (arr, docType) {
  return arr.length > 0
    ? arr.map(data => `- [${data.name}](#${data.name})`).join('\n')
    : `_no ${docType} defined in the [configuration file](./serverless.yml)..._`
}
