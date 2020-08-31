/* eslint-env mocha */
const runAction = require('../helpers/run-action.js')
const steps = ['pre', 'main']
const fs = require('fs')
const chai = require('chai')
chai.should()

describe('action docs generation', function () {
  this.timeout(60000)
  before(async () => {
    process.env.INPUT_TYPE = 'action'
    process.env.GITHUB_BASE_REF = 'ref:head/master'
  })
  it('should generate docs with no template provided', async () => {
    await test('test/action/all-params', 'validation-no-template.md')
  })
  it('should generate docs with template provided', async () => {
    process.env.INPUT_TEMPLATE = '../data/template.md'
    await test('test/action/all-params', 'validation.md')
  })
  it('should generate docs refering to the current branch', async () => {
    delete process.env.INPUT_TEMPLATE
    process.env.GITHUB_BASE_REF = 'ref:head/dev'
    await test('test/action/all-params', 'validation-branch.md')
  })
  it('should generate docs with no inputs', async () => {
    process.env.GITHUB_BASE_REF = 'ref:head/master'
    await test('test/action/no-inputs', 'validation.md')
  })
  it('should generate docs with no env', async () => {
    await test('test/action/no-env', 'validation.md')
  })
  it('should generate docs with no outputs', async () => {
    await test('test/action/no-outputs', 'validation.md')
  })
  afterEach(() => {
    fs.unlinkSync('README.md')
    process.chdir('../../../')
  })
  after(() => {
    delete process.env.INPUT_TYPE
    delete process.env.GITHUB_BASE_REF
  })
})

async function test (testFolder, validationFile) {
  process.chdir(testFolder)
  await runAction(steps)
  const docs = fs.readFileSync('README.md', 'utf8')
  const validation = fs.readFileSync(validationFile, 'utf8')
  docs.should.equal(validation)
}
