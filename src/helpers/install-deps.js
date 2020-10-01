const { spawnSync } = require('child_process')

module.exports = opts => {
  const cwd = process.cwd()
  opts = {
    path: cwd,
    deps: [],
    ...opts
  }
  const { path, deps } = opts
  process.chdir(path)
  console.log(`INFO: installing dependencies in directory ${path}...`)
  spawnSync('npm', ['i', ...deps])
  console.log('SUCCESS: dependencies installed!')
  process.chdir(cwd)
}
