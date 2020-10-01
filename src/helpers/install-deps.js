const { spawnSync } = require('child_process')

const cwd = process.cwd()

module.exports = (path = cwd) => {
  process.chdir(path)
  console.log(`INFO: installing dependencies in directory ${path}...`)
  spawnSync('npm', ['i'])
  console.log('SUCCESS: dependencies installed!')
  process.chdir(cwd)
}
