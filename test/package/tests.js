/* eslint-env mocha */
const runAction = require('../helpers/run-action.js')
const test = require('../helpers/test.js')
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
    await test(cwd, 'test/package/no-template', 'validation.md')
  })
  it('should generate docs for nested files', async () => {
    await test(cwd, 'test/package/nested', 'validation.md')
  })
  it('should handle CLI type of packages', async () => {
    await test(cwd, 'test/package/cli-pkg', 'validation.md')
  })
  it('should generate docs with a template provided', async () => {
    process.env.INPUT_TEMPLATE = '../template.md'
    await test(cwd, 'test/package/with-template', 'validation.md')
      .finally(() => {
        delete process.env.INPUT_TEMPLATE
      })
  })
  it('should generate docs as if no template was provided if the template file does not exist', async () => {
    process.env.INPUT_TEMPLATE = '../template-not-existing.md'
    await test(cwd, 'test/package/wrong-template', 'validation.md')
      .finally(() => {
        delete process.env.INPUT_TEMPLATE
      })
  })
  after(() => {
    delete process.env.INPUT_TYPE
  })
})
