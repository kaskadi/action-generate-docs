/* eslint-env mocha */
const runAction = require('../helpers/run-action.js')
const test = require('../helpers/test.js')
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
    await test(cwd, 'test/action/all-params', 'validation-no-template.md')
  })
  it('should generate docs with template provided', async () => {
    process.env.INPUT_TEMPLATE = '../template.md'
    await test(cwd, 'test/action/all-params', 'validation.md')
      .finally(() => {
        delete process.env.INPUT_TEMPLATE
      })
  })
  describe('when working in a branch', () => {
    it('should generate docs refering to the current branch when triggered by PR', async () => {
      process.env.GITHUB_BASE_REF = 'ref:head/dev'
      delete process.env.GITHUB_REF
      await test(cwd, 'test/action/all-params', 'validation-branch.md')
        .finally(() => {
          delete process.env.GITHUB_BASE_REF
        })
    })
    it('should generate docs refering to the current branch when triggered by non PR events', async () => {
      process.env.GITHUB_REF = 'ref:head/dev'
      await test(cwd, 'test/action/all-params', 'validation-branch.md')
        .finally(() => {
          delete process.env.GITHUB_REF
        })
    })
    it('should default branch to master if no reference exists', async () => {
      await test(cwd, 'test/action/all-params', 'validation-no-template.md')
      process.env.GITHUB_BASE_REF = 'ref:head/master'
    })
  })
  it('should use placeholder values for value in configuration example', async () => {
    await test(cwd, 'test/action/ph-value', 'validation.md')
  })
  it('should generate docs with no inputs', async () => {
    await test(cwd, 'test/action/no-inputs', 'validation.md')
  })
  it('should generate docs with no env', async () => {
    await test(cwd, 'test/action/no-env', 'validation.md')
  })
  it('should generate docs with no outputs', async () => {
    await test(cwd, 'test/action/no-outputs', 'validation.md')
  })
  after(() => {
    delete process.env.INPUT_TYPE
    delete process.env.GITHUB_BASE_REF
  })
})
