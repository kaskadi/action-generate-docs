const path = require('path')
const replaceInFile = require('../replace-in-file.js')

module.exports = (fs, data, templatePath) => {
  let main = fs.readFileSync(path.join(__dirname, 'layer-partial.md'), 'utf8')
  for (const key in data) {
    main = replaceInFile(main, key, data[key])
  }
  if (!fs.existsSync(templatePath) || !templatePath) {
    return main
  }
  return replaceInFile(fs.readFileSync(templatePath, 'utf8'), 'main', main)
}
