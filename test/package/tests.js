/* eslint-env mocha */
const runAction = require('../helpers/run-action.js')
const steps = ['pre', 'main']
const fs = require('fs')
const chai = require('chai')
chai.should()

describe('package docs generation', function () {
  this.timeout(60000)
  before(() => {
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
    process.env.INPUT_TEMPLATE = '../data/template.md'
    await test('test/package/with-template', 'validation.md')
  })
  it('should generate docs as if no template was provided if the template file does not exist', async () => {
    process.env.INPUT_TEMPLATE = '../data/template-not-existing.md'
    await test('test/package/wrong-template', 'validation.md')
  })
  afterEach(() => {
    // fs.unlinkSync('README.md')
    process.chdir('../../../')
  })
  after(() => {
    delete process.env.INPUT_TYPE
    delete process.env.INPUT_TEMPLATE
  })
})

async function test (testFolder, validationFile) {
  process.chdir(testFolder)
  await runAction(steps)
  const docs = fs.readFileSync('README.md', 'utf8')
  const validation = fs.readFileSync(validationFile, 'utf8')
  docs.should.equal(validation)
}
