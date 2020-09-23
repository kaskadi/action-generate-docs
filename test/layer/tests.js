/* eslint-env mocha */
const runAction = require('../helpers/run-action.js')
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
    await test('test/layer/no-template', 'validation.md')
  })
  it('should generate docs with a template provided', async () => {
    process.env.INPUT_TEMPLATE = '../template.md'
    await test('test/layer/with-template', 'validation.md')
  })
  it('should support multi-layer situations', async () => {
    delete process.env.INPUT_TEMPLATE
    await test('test/layer/multi-layer', 'validation.md')
  })
  it('should generate docs with no layer', async () => {
    await test('test/layer/no-layer', 'validation.md')
  })
  it('should generate docs with any path to nodejs folder', async () => {
    await test('test/layer/layer-path', 'validation.md')
  })
  it('should generate docs with no description provided', async () => {
    await test('test/layer/no-description', 'validation.md')
  })
  it('should generate docs with no packages installed yet', async () => {
    const validationPath = '../validation.md'
    await test('test/layer/no-packages/no-deps', validationPath)
    await test('test/layer/no-packages/empty-deps', validationPath)
  })
  it('should generate docs when using variables in serverless.yml', async () => {
    await test('test/layer/sls-var', 'validation.md')
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
