/* eslint-env mocha */
const runAction = require('../helpers/run-action.js')
const fs = require('fs')
const chai = require('chai')
chai.should()

const cwd = process.cwd()

describe('lambda docs generation', function () {
  this.timeout(120000)
  before(async () => {
    await runAction(['pre'])
    process.env.INPUT_TYPE = 'api'
  })
  it('should generate docs with no template provided', async () => {
    await test('test/api/no-template', 'validation.md')
  })
  it('should generate docs with a template provided', async () => {
    process.env.INPUT_TEMPLATE = '../template.md'
    await test('test/api/with-template', 'validation.md')
      .finally(() => {
        delete process.env.INPUT_TEMPLATE
      })
  })
  it('should generate docs with no endpoints defined', async () => {
    await test('test/api/no-lambda', 'validation.md')
  })
  it('should generate docs with layers attached to an endpoint', async () => {
    await test('test/api/with-layer', 'validation.md')
  })
  it('should generate docs when no kaskadi-docs field has been provided for a given method', async () => {
    await test('test/api/no-custom-field', 'validation.md')
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
