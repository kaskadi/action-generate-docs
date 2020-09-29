const { getPartial, buildList } = require('./utils.js')
const replaceInFile = require('./replace-in-file.js')

module.exports = ({ fs, path }, data, templatePath, type) => {
  let main = fs.readFileSync(path.join(__dirname, '..', `main-handlers/${type}/main-partial.md`), 'utf8')
  const handlers = {
    layer: getLayersData,
    lambda: getLambdasData,
    api: getEndpointsData
  }
  const replaceData = handlers[type](fs, path, data)
  for (const key in replaceData) {
    main = replaceInFile(main, key, replaceData[key])
  }
  main = main.trim()
  if (!fs.existsSync(templatePath) || !templatePath) {
    return main
  }
  return replaceInFile(fs.readFileSync(templatePath, 'utf8'), 'main', main)
}

function getLayersData (fs, path, data) {
  const { layers } = data
  const layerDocType = 'layer'
  const partialPath = path.join(__dirname, '..', 'main-handlers/layer/layer-partial.md')
  return {
    layers: getPartial(fs, layers, partialPath, layerDocType),
    'layers-list': buildList(layers, layerDocType)
  }
}

function getLambdasData (fs, path, data) {
  const addDetails = require('../main-handlers/lambda/add-details.js')
  const { functions } = data
  const lambdaDocType = 'lambda function'
  const partialPath = path.join(__dirname, '..', 'main-handlers/lambda/lambda-partial.md')
  const lambdas = functions.map(addDetails(fs, path))
  return {
    ...getLayersData(fs, path, data),
    lambdas: getPartial(fs, lambdas, partialPath, lambdaDocType),
    'lambdas-list': buildList(lambdas, lambdaDocType)
  }
}

function getEndpointsData (fs, path, data) {
  const { endpoints } = data
  return {
    ...getLambdasData(fs, path, data),
    endpoints
  }
}
