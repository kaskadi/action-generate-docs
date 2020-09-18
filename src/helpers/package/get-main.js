const jsdoc2md = require('jsdoc-to-markdown')

module.exports = ({ replaceInFile, fs, path }) => {
  const pjson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const replaceOpts = {
    flags: pjson.bin ? '-g ' : '',
    'repo-name': pjson.name,
    main: genBaseDocs(path)
  }
  let main = fs.readFileSync(path.join(__dirname, 'template.md'), 'utf8')
  for (const key in replaceOpts) {
    main = replaceInFile(main, key, replaceOpts[key])
  }
  return main
}

function genBaseDocs (path) {
  const opts = {
    files: '**/**.js',
    'example-lang': 'js',
    'no-cache': true,
    'heading-depth': 2,
    plugin: '@godaddy/dmd'
  }
  const oldPath = process.env.NODE_PATH
  const pluginDir = path.join(__dirname, '../../../node_modules')
  process.env.NODE_PATH = `${oldPath}:${pluginDir}`
  const main = jsdoc2md.renderSync(opts).trim()
  process.env.NODE_PATH = oldPath
  return main
}
