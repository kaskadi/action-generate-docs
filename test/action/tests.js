/* eslint-env mocha */
const runAction = require('../helpers/run-action.js')
const fs = require('fs')
const chai = require('chai')
chai.should()

const cwd = process.cwd()

describe('action docs generation', function () {
  this.timeout(60000)
  before(async () => {
    await runAction(['pre'])
    process.env.INPUT_TYPE = 'action'
    process.env.GITHUB_BASE_REF = 'ref:head/master'
  })
  it('should generate docs with no template provided', async () => {
    await test('test/action/all-params', 'validation-no-template.md')
  })
  it('should generate docs with template provided', async () => {
    process.env.INPUT_TEMPLATE = '../template.md'
    await test('test/action/all-params', 'validation.md')
    delete process.env.INPUT_TEMPLATE
  })
  it('should generate docs refering to the current branch', async () => {
    process.env.GITHUB_BASE_REF = 'ref:head/dev'
    await test('test/action/all-params', 'validation-branch.md')
    process.chdir(cwd)
    delete process.env.GITHUB_BASE_REF
    process.env.GITHUB_REF = 'ref:head/dev'
    await test('test/action/all-params', 'validation-branch.md')
    delete process.env.GITHUB_REF
    process.env.GITHUB_BASE_REF = 'ref:head/master'
  })
  it('should use placeholder values for value in configuration example', async () => {
    await test('test/action/ph-value', 'validation.md')
  })
  it('should generate docs with no inputs', async () => {
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
    process.chdir(cwd)
  })
  after(() => {
    delete process.env.INPUT_TYPE
    delete process.env.GITHUB_BASE_REF
  })
})

async function test (testFolder, validationFile) {
  process.chdir(testFolder)
  await runAction(['main'])
  const docs = fs.readFileSync('README.md', 'utf8')
  const validation = fs.readFileSync(validationFile, 'utf8')
  docs.should.equal(validation)
}
