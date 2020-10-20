const { spawnSync } = require('child_process')

module.exports = ({ glob, jsdoc2md }) => {
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
  return { main }
}
