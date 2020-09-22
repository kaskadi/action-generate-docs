const replaceInFile = require('../replace-in-file.js')

module.exports = ({ fs, path }, data, templatePath) => {
  let main = fs.readFileSync(path.join(__dirname, 'main-partial.md'), 'utf8')
  const layerPartial = fs.readFileSync(path.join(__dirname, 'layer-partial.md'), 'utf8')
  const layers = data.map(buildLayerDocs(layerPartial)).join('\n\n').trim()
  main = replaceInFile(main, 'layers', layers)
  main = replaceInFile(main, 'layers-list', buildLayersList(data))
  if (!fs.existsSync(templatePath) || !templatePath) {
    return main
  }
  return replaceInFile(fs.readFileSync(templatePath, 'utf8'), 'main', main)
}

function buildLayerDocs (layerPartial) {
  return layer => Object.keys(layer).reduce((partial, key) => replaceInFile(partial, key, layer[key] || `No ${key} found for this layer...`), layerPartial)
}

function buildLayersList (data) {
  return data.map(layer => `- [${layer.name}](#${layer.name})`).join('\n')
}
