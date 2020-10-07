const runAction = require('./run-action.js')
const { readFileSync, unlinkSync, existsSync } = require('fs')
const rimraf = require('rimraf')

module.exports = async (cwd, testFolder, validationFile) => {
  process.chdir(testFolder)
  await runAction(['main'])
  const docs = readFileSync('README.md', 'utf8')
  const validation = readFileSync(validationFile, 'utf8')
  // cleanup
  unlinkSync('README.md')
  if (existsSync('package-lock.json')) {
    unlinkSync('package-lock.json')
  }
  if (existsSync('node_modules')) {
    rimraf.sync('node_modules')
  }
  process.chdir(cwd)
  docs.should.equal(validation)
}
