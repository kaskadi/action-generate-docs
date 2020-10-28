const { spawnSync } = require('child_process')

module.exports = (modules, type) => {
  const pjson = require(`${process.cwd()}/package.json`)
  let opts = {
    'example-lang': getExampleLang(pjson, type),
    'no-cache': true,
    'heading-depth': 2,
    plugin: '@godaddy/dmd'
  }
  const files = getFiles(modules, pjson, type)
  if (files.length === 0) {
    return {
      main: `No file is matching the main file (\`${pjson.main}\`) provided in \`package.json\`...`
    }
  }
  opts = { ...opts, files }
  spawnSync('npm', ['i', '@godaddy/dmd'])
  const { jsdoc2md } = modules
  const main = jsdoc2md.renderSync(opts).trim()
  spawnSync('npm', ['rm', '@godaddy/dmd'])
  return { main }
}

function getExampleLang (pjson, type) {
  const { kaskadi } = pjson
  if (kaskadi && kaskadi.docs && kaskadi.docs['example-lang']) {
    return kaskadi.docs['example-lang']
  }
  return type === 'package' ? 'js' : 'html'
}

function getFiles ({ fs, glob }, pjson, type) {
  if (type !== 'package') {
    const { main } = pjson
    if (!fs.existsSync(main)) {
      return ''
    }
    return main
  }
  return glob.sync('**/*.js', { ignore: 'node_modules/**' })
}
