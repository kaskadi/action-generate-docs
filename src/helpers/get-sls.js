const { spawnSync } = require('child_process')
const path = require('path')

module.exports = (YAML, callingDir) => {
  const sls = spawnSync('node', [path.join(callingDir, 'node_modules/serverless/bin/serverless.js'), 'print']).stdout.toString().trim()
  return YAML.parse(sls)
}
