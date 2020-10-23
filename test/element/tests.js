/* eslint-env mocha */
const runAction = require('../helpers/run-action.js')
const test = require('../helpers/test.js')
const chai = require('chai')
chai.should()

const cwd = process.cwd()

describe('element docs generation', function () {
  this.timeout(60000)
  before(async () => {
    await runAction(['pre'])
    process.env.INPUT_TYPE = 'element'
  })
  it('should generate docs with no template provided', async () => {
    await test(cwd, 'test/element/no-template', 'validation.md')
  })
  it('should generate docs for nested files', async () => {
    await test(cwd, 'test/element/nested', 'validation.md')
  })
  it('should generate docs with a template provided', async () => {
    process.env.INPUT_TEMPLATE = '../template.md'
    await test(cwd, 'test/element/with-template', 'validation.md')
      .finally(() => {
        delete process.env.INPUT_TEMPLATE
      })
  })
  it('should generate docs as if no template was provided if the template file does not exist', async () => {
    process.env.INPUT_TEMPLATE = '../template-not-existing.md'
    await test(cwd, 'test/element/wrong-template', 'validation.md')
      .finally(() => {
        delete process.env.INPUT_TEMPLATE
      })
  })
  describe('usage instructions printing', function () {
    it('should handle absence of match with main file', async () => {
      await test(cwd, 'test/element/usage/no-match', 'validation.md')
    })
    it('should handle absence of files in kaskadi.s3-push inside of package.json', async () => {
      await test(cwd, 'test/element/usage/no-files', 'validation.md')
    })
    it('should handle absence of s3-push in kaskadi inside of package.json', async () => {
      await test(cwd, 'test/element/usage/no-s3-push', 'validation.md')
    })
    it('should handle absence of kaskadi field inside of package.json', async () => {
      await test(cwd, 'test/element/usage/no-kaskadi', 'validation.md')
    })
  })
  after(() => {
    delete process.env.INPUT_TYPE
  })
})
