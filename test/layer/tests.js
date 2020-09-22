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
  it('should generate docs with no template provided', async () => {
    await test('test/layer/no-template', 'validation.md')
  })
  it('should generate docs with a template provided', async () => {
    process.env.INPUT_TEMPLATE = '../template.md'
    await test('test/layer/with-template', 'validation.md')
  })
  it('should generate docs with any path to nodejs folder', async () => {
    delete process.env.INPUT_TEMPLATE
    await test('test/layer/layer-path', 'validation.md')
  })
  it('should generate docs with no description provided in package.json', async () => {
    await test('test/layer/no-description', 'validation.md')
  })
  it('should generate docs with no packages installed yet', async () => {
    const validationPath = '../validation.md'
    await test('test/layer/no-packages/no-deps', validationPath)
    process.chdir(cwd)
    await test('test/layer/no-packages/empty-deps', validationPath)
  })
  it('should generate docs when using variables in serverless.yml', async () => {
    await test('test/layer/sls-var', 'validation.md')
  })
  afterEach(() => {
    fs.unlinkSync('README.md')
    process.chdir(cwd)
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
  docs.should.equal(validation)
}
