const path = require('path')
const replaceInFile = require('../replace-in-file.js')

module.exports = (fs, config, templatePath) => {
  let main = fs.readFileSync(path.join(__dirname, 'action-partial.md'), 'utf8')
  config = {
    ...config,
    branch: getCurrentBranchName()
  }
  for (const key in config) {
    main = replaceInFile(main, key, config[key])
  }
  if (templatePath) {
    const regExp = new RegExp('{{>main}}', 'g')
    return fs.readFileSync(`${process.cwd()}/${templatePath}`, 'utf8').replace(regExp, main)
  }
  return main
}

function getCurrentBranchName () {
  const ref = process.env.GITHUB_BASE_REF || process.env.GITHUB_REF
  const refs = ref && ref.length > 0 ? ref.split('/') : ['master']
  return refs[refs.length - 1]
}
