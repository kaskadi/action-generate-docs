const jsdoc2md = require('jsdoc-to-markdown')

module.exports = ({ replaceInFile, fs, path }) => {
  const pjson = require('./package.json')
  const replaceOpts = {
    flags: pjson.bin ? '-g' : '',
    'repo-name': pjson.name,
    main: genBaseDocs()
  }
  let main = fs.readFileSync(path.join(__dirname, 'template.md'), 'utf8')
  for (const key of replaceOpts) {
    main = replaceInFile(main, key, replaceOpts[key])
  }
  return main
}

function genBaseDocs () {
  const opts = {
    files: '**/**.js',
    'example-lang': 'js',
    'no-cache': true,
    'heading-depth': 2
  }
  return jsdoc2md.renderSync(opts).trim()
}
