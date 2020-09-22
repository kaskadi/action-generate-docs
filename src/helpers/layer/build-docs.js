const replaceInFile = require('../replace-in-file.js')
const buildLayersList = require('../build-list.js')
const buildLayerDocs = require('../build-partial.js')

module.exports = ({ fs, path }, data, templatePath) => {
  let main = fs.readFileSync(path.join(__dirname, 'main-partial.md'), 'utf8')
  const layerPartial = fs.readFileSync(path.join(__dirname, 'layer-partial.md'), 'utf8')
  const layers = data.map(buildLayerDocs(layerPartial, 'layer')).join('\n\n').trim()
  main = replaceInFile(main, 'layers', layers)
  main = replaceInFile(main, 'layers-list', buildLayersList(data))
  if (!fs.existsSync(templatePath) || !templatePath) {
    return main
  }
  return replaceInFile(fs.readFileSync(templatePath, 'utf8'), 'main', main)
}
