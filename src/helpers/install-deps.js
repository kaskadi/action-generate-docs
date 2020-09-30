const { spawnSync } = require('child_process')

const cwd = process.cwd()

module.exports = (path = cwd) => {
  process.chdir(path)
  console.log(`INFO: installing dependencies in directory ${path}...`)
  console.log('************ NPM ouput ************')
  spawnSync('npm', ['i'], { stdio: 'inherit' })
  console.log('************ End of NPM ouput ************')
  console.log('SUCCESS: dependencies installed!')
  process.chdir(cwd)
}
