/* eslint-env mocha */
const runAction = require('../helpers/run-action.js')
const test = require('../helpers/test.js')
const fs = require('fs')
const chai = require('chai')
chai.should()

const cwd = process.cwd()

describe('layer docs generation', function () {
  this.timeout(60000)
  before(async () => {
    await runAction(['pre'])
    process.env.INPUT_TYPE = 'layer'
  })
  it('should not generate docs if no serverless configuration file exists', async () => {
    process.chdir('test/layer/no-config-file')
    await runAction(['main'])
    fs.existsSync('README.md').should.equal(false)
    process.chdir(cwd)
  })
  it('should generate docs with no template provided', async () => {
    await test(cwd, 'test/layer/no-template', 'validation.md')
  })
  it('should generate docs with a template provided', async () => {
    process.env.INPUT_TEMPLATE = '../template.md'
    await test(cwd, 'test/layer/with-template', 'validation.md')
      .finally(() => {
        delete process.env.INPUT_TEMPLATE
      })
  })
  it('should support multi-layer situations', async () => {
    await test(cwd, 'test/layer/multi-layer', 'validation.md')
  })
  it('should generate docs with no layer', async () => {
    await test(cwd, 'test/layer/no-layer', 'validation.md')
  })
  it('should generate docs with any path to nodejs folder', async () => {
    await test(cwd, 'test/layer/layer-path', 'validation.md')
  })
  it('should generate docs with no description provided', async () => {
    await test(cwd, 'test/layer/no-description', 'validation.md')
  })
  describe('with no packages installed', () => {
    it('should generate docs when there is no dependencies field in package.json', async () => {
      await test(cwd, 'test/layer/no-packages/no-deps', '../validation.md')
    })
    it('should generate docs when dependencies value in package.json is an empty object', async () => {
      await test(cwd, 'test/layer/no-packages/empty-deps', '../validation.md')
    })
  })
  it('should generate docs when using variables in serverless.yml', async () => {
    await test(cwd, 'test/layer/sls-var', 'validation.md')
  })
  it('should generate docs with local utilities in dependencies', async () => {
    await test(cwd, 'test/layer/local-utils', 'validation.md')
  })
  after(() => {
    delete process.env.INPUT_TYPE
  })
})
