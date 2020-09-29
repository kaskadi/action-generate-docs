const { getPartial, buildList } = require('./utils.js')
const fs = require('fs')
const path = require('path')
const replaceInFile = require('../replace-in-file.js')

const srcDir = path.join(__dirname, '../../')

module.exports = (data, templatePath, type) => {
  let main = fs.readFileSync(path.join(srcDir, `main-handlers/${type}/main-partial.md`), 'utf8')
  const handlers = {
    layer: getLayersData,
    lambda: getLambdasData,
    api: getEndpointsData
  }
  const replaceData = handlers[type](data)
  for (const key in replaceData) {
    main = replaceInFile(main, key, replaceData[key])
  }
  main = main.trim()
  if (!fs.existsSync(templatePath) || !templatePath) {
    return main
  }
  return replaceInFile(fs.readFileSync(templatePath, 'utf8'), 'main', main)
}

function getLayersData (data) {
  const { layers } = data
  const layerDocType = 'layer'
  const partialPath = path.join(srcDir, 'main-handlers/layer/layer-partial.md')
  return {
    layers: getPartial(fs, layers, partialPath, layerDocType),
    'layers-list': buildList(layers, layerDocType)
  }
}

function getLambdasData (data) {
  const addDetails = require('../../main-handlers/lambda/add-details.js')
  const { functions } = data
  const lambdaDocType = 'lambda function'
  const partialPath = path.join(srcDir, 'main-handlers/lambda/lambda-partial.md')
  const lambdas = functions.map(addDetails(fs, path))
  return {
    ...getLayersData(data),
    lambdas: getPartial(fs, lambdas, partialPath, lambdaDocType),
    'lambdas-list': buildList(lambdas, lambdaDocType)
  }
}

function getEndpointsData (data) {
  const { endpoints } = data
  return {
    ...getLambdasData(data),
    endpoints
  }
}
