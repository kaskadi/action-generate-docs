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
  describe('when working in a branch', () => {
    it('should generate docs refering to the current branch when triggered by PR', async () => {
      process.env.GITHUB_BASE_REF = 'ref:head/dev'
      delete process.env.GITHUB_REF
      await test('test/action/all-params', 'validation-branch.md')
      delete process.env.GITHUB_BASE_REF
    })
    it('should generate docs refering to the current branch when triggered by non PR events', async () => {
      process.env.GITHUB_REF = 'ref:head/dev'
      await test('test/action/all-params', 'validation-branch.md')
      delete process.env.GITHUB_REF
      process.env.GITHUB_BASE_REF = 'ref:head/master'
    })
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
  fs.unlinkSync('README.md')
  process.chdir(cwd)
  docs.should.equal(validation)
}
