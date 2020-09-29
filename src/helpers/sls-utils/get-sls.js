const { spawnSync } = require('child_process')

module.exports = ({ YAML, fs, path }, callingDir) => {
  if (!fs.existsSync('serverless.yml')) {
    console.log('ERROR: no serverless.yml configuration file found, aborting...')
    process.exit(0)
  }
  const sls = spawnSync('node', [path.join(callingDir, 'node_modules/serverless/bin/serverless.js'), 'print']).stdout.toString().trim()
  return YAML.parse(sls)
}
