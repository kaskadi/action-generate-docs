const { spawnSync } = require('child_process')

module.exports = ({ fs, glob, jsdoc2md }, type) => {
  let opts = {
    'example-lang': type === 'package' ? 'js' : 'html',
    'no-cache': true,
    'heading-depth': 2,
    plugin: '@godaddy/dmd'
  }
  let files
  if (type !== 'package') {
    const { main } = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    if (!fs.existsSync(main)) {
      return {
        main: `No file is matching the main file (\`${main}\`) provided in \`package.json\`...`
      }
    }
    files = main
  } else {
    files = glob.sync('**/*.js', { ignore: 'node_modules/**' })
  }
  opts = { ...opts, files }
  spawnSync('npm', ['i', '@godaddy/dmd'])
  const main = jsdoc2md.renderSync(opts).trim()
  spawnSync('npm', ['rm', '@godaddy/dmd'])
  return { main }
}
