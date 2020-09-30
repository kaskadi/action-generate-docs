const { spawnSync } = require('child_process')

module.exports = ({ YAML, fs, slsCli }) => {
  if (!fs.existsSync('serverless.yml')) {
    console.log('ERROR: no serverless.yml configuration file found, aborting...')
    process.exit(0)
  }
  const sls = spawnSync('node', [slsCli, 'print']).stdout.toString().trim()
  console.log(sls)
  return YAML.parse(sls)
}
