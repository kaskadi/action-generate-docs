const { spawnSync } = require('child_process')

module.exports = path => {
  const cwd = process.cwd()
  process.chdir(path)
  console.log('INFO: installing module dependencies...')
  console.log('************ NPM ouput ************')
  spawnSync('npm', ['i'], { stdio: 'inherit' })
  console.log('************ End of NPM ouput ************')
  console.log('SUCCESS: dependencies installed!')
  process.chdir(cwd)
}
