const jsdoc2md = require('jsdoc-to-markdown')
const { spawnSync } = require('child_process')
const glob = require('glob')

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
    files: glob.sync('**/*.js', { ignore: 'node_modules/**' }),
    'example-lang': 'js',
    'no-cache': true,
    'heading-depth': 2,
    plugin: '@godaddy/dmd'
  }
  spawnSync('npm', ['i', '@godaddy/dmd'])
  const main = jsdoc2md.renderSync(opts).trim()
  spawnSync('npm', ['rm', '@godaddy/dmd'])
  return main
}
