/* eslint-env mocha */
const runAction = require('../helpers/run-action.js')
const fs = require('fs')
const chai = require('chai')
chai.should()

const cwd = process.cwd()

describe('lambda docs generation', function () {
  this.timeout(60000)
  before(async () => {
    await runAction(['pre'])
    process.env.INPUT_TYPE = 'lambda'
  })
  it('should not generate docs if no serverless configuration file exists', async () => {
    process.chdir('test/lambda/no-config-file')
    await runAction(['main'])
    fs.existsSync('README.md').should.equal(false)
    process.chdir(cwd)
  })
  it('should generate docs with no template provided', async () => {
    await test('test/lambda/no-template', 'validation.md')
  })
  it('should generate docs with a template provided', async () => {
    process.env.INPUT_TEMPLATE = '../template.md'
    await test('test/lambda/with-template', 'validation.md')
  })
  it('should generate docs when no lambdas are defined', async () => {
    delete process.env.INPUT_TEMPLATE
    await test('test/lambda/no-lambda', 'validation.md')
  })
  it('should support multi-lambda situations', async () => {
    await test('test/lambda/multi-lambda', 'validation.md')
  })
  it('should generate docs with complex path to lambda handler', async () => {
    await test('test/lambda/handler-path', 'validation.md')
  })
  it('should generate docs with multiple sources defined', async () => {
    await test('test/lambda/multi-sources', 'validation.md')
  })
  it('should generate docs without any sources defined', async () => {
    await test('test/lambda/no-source', 'validation.md')
  })
  it('should generate docs with destinations', async () => {
    await test('test/lambda/destinations', 'validation.md')
  })
  it('should generate docs with split configuration file', async () => {
    await test('test/lambda/split-config', 'validation.md')
  })
  it('should generate docs when using variable in serverless configuration file', async () => {
    await test('test/lambda/sls-var', 'validation.md')
  })
  it('should support layers', async () => {
    await test('test/lambda/with-layers', 'validation.md')
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
