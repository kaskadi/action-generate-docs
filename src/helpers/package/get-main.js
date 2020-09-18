const jsdoc2md = require('jsdoc-to-markdown')

module.exports = ({ replaceInFile, fs, path }) => {
  const pjson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const replaceOpts = {
    flags: pjson.bin ? '-g ' : '',
    'repo-name': pjson.name,
    main: genBaseDocs()
  }
  let main = fs.readFileSync(path.join(__dirname, 'template.md'), 'utf8')
  for (const key in replaceOpts) {
    main = replaceInFile(main, key, replaceOpts[key])
  }
  return main
}

function genBaseDocs () {
  const opts = {
    files: '**/**.js',
    'example-lang': 'js',
    'no-cache': true,
    'heading-depth': 2,
    plugin: '@godaddy/dmd'
  }
  return jsdoc2md.renderSync(opts).trim()
}
