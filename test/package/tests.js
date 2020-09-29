/* eslint-env mocha */
const runAction = require('../helpers/run-action.js')
const fs = require('fs')
const chai = require('chai')
chai.should()

const cwd = process.cwd()

describe('package docs generation', function () {
  this.timeout(60000)
  before(async () => {
    await runAction(['pre'])
    process.env.INPUT_TYPE = 'package'
  })
  it('should generate docs with no template provided', async () => {
    await test('test/package/no-template', 'validation.md')
  })
  it('should generate docs for nested files', async () => {
    await test('test/package/nested', 'validation.md')
  })
  it('should handle CLI type of packages', async () => {
    await test('test/package/cli-pkg', 'validation.md')
  })
  it('should generate docs with a template provided', async () => {
    process.env.INPUT_TEMPLATE = '../template.md'
    await test('test/package/with-template', 'validation.md')
      .finally(() => {
        delete process.env.INPUT_TEMPLATE
      })
  })
  it('should generate docs as if no template was provided if the template file does not exist', async () => {
    process.env.INPUT_TEMPLATE = '../template-not-existing.md'
    await test('test/package/wrong-template', 'validation.md')
      .finally(() => {
        delete process.env.INPUT_TEMPLATE
      })
  })
  after(() => {
    delete process.env.INPUT_TYPE
  })
})

async function test (testFolder, validationFile) {
  process.chdir(testFolder)
  await runAction(['main'])
  const docs = fs.readFileSync('README.md', 'utf8')
  const validation = fs.readFileSync(validationFile, 'utf8')
  fs.unlinkSync('README.md')
  process.chdir(cwd)
  docs.should.equal(validation)
}
