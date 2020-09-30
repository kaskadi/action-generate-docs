const getPartials = require('./get-partials.js')
const replaceInFile = require('../replace-in-file.js')

module.exports = (modules, data, templatePath, type) => {
  const { fs, path } = modules
  let main = fs.readFileSync(path.join(__dirname, `../../main-handlers/${type}/main-partial.md`), 'utf8')
  const handlers = {
    layer: getLayersData,
    lambda: getLambdasData,
    api: getEndpointsData
  }
  const replaceData = {
    ...handlers[type](data, modules),
    tags: getTags(modules, data.tags)
  }
  for (const key in replaceData) {
    main = replaceInFile(main, key, replaceData[key])
  }
  main = main.replace(/\n\n\n/g, '\n').trim()
  if (!fs.existsSync(templatePath) || !templatePath) {
    return main
  }
  return replaceInFile(fs.readFileSync(templatePath, 'utf8'), 'main', main)
}

function getTags ({ table }, tags) {
  return table([
    ['Tag', 'Value'],
    ...Object.entries(tags)
  ],
  { align: ['l', 'l'] }
  )
}

function getLayersData (data) {
  const { layers } = data
  return getPartials(layers, 'layers')
}

function getLambdasData (data, modules) {
  const addDetails = require('../../main-handlers/lambda/add-details.js')
  const { functions } = data
  const lambdas = functions.map(addDetails(modules))
  return {
    ...getLayersData(data),
    ...getPartials(lambdas, 'lambdas')
  }
}

function getEndpointsData (data, modules) {
  const buildMethods = require('../../main-handlers/api/build-methods.js')
  let { endpoints } = data
  endpoints = buildMethods(modules, endpoints).map(endpoint => {
    return {
      ...endpoint,
      ...getPartials(endpoint.methods, 'methods')
    }
  })
  return {
    ...getLambdasData(data, modules),
    ...getPartials(endpoints, 'endpoints')
  }
}
