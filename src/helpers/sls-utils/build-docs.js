const getPartials = require('./get-partials.js')
const replaceInFile = require('../replace-in-file.js')

const types = {
  layer: {
    key: 'layers',
    getPartialData: (data, modules) => data.layers
  },
  lambda: {
    key: 'lambdas',
    getPartialData: (data, modules) => {
      const addDetails = require('../../main-handlers/lambda/add-details.js')
      return data.functions.map(addDetails(modules))
    }
  },
  api: {
    key: 'endpoints',
    getPartialData: (data, modules) => {
      const buildMethods = require('../../main-handlers/api/build-methods.js')
      return buildMethods(modules, data.endpoints).map(endpoint => {
        return {
          ...endpoint,
          ...getPartials(endpoint.methods, 'methods')
        }
      })
    }
  }
}

module.exports = (modules, data, templatePath, type) => {
  const { fs, path } = modules
  let main = fs.readFileSync(path.join(__dirname, `../../main-handlers/${type}/main-partial.md`), 'utf8')
  const baseUrl = data['base-url']
  const replaceData = {
    ...getPartials4Type(modules, data, type),
    'base-url': baseUrl.length > 0 ? `The origin and root path for this API is: \`${baseUrl}\`` : '',
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

function getPartials4Type (modules, data, type) {
  let partials = {}
  for (const typeKey in types) {
    const key = types[typeKey].key
    const partialData = types[typeKey].getPartialData(data, modules)
    partials = {
      ...partials,
      ...getPartials(partialData, key)
    }
    if (typeKey === type) {
      break
    }
  }
  return partials
}

function getTags ({ table }, tags) {
  return table([
    ['Tag', 'Value'],
    ...Object.entries(tags)
  ],
  { align: ['l', 'l'] }
  )
}
