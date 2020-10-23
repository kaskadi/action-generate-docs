const { spawnSync } = require('child_process')

module.exports = ({ fs, glob, jsdoc2md }, type) => {
  const opts = {
    files: type === 'package'
      ? glob.sync('**/*.js', { ignore: 'node_modules/**' })
      : JSON.parse(fs.readFileSync('package.json', 'utf8')).main,
    'example-lang': type === 'package'
      ? 'js'
      : 'html',
    'no-cache': true,
    'heading-depth': 2,
    plugin: '@godaddy/dmd'
  }
  spawnSync('npm', ['i', '@godaddy/dmd'])
  const main = jsdoc2md.renderSync(opts).trim()
  spawnSync('npm', ['rm', '@godaddy/dmd'])
  return { main }
}
