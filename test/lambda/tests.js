/* eslint-env mocha */
const runAction = require('../helpers/run-action.js')
const test = require('../helpers/test.js')
const chai = require('chai')
chai.should()

const cwd = process.cwd()

describe('lambda docs generation', function () {
  this.timeout(120000)
  before(async () => {
    await runAction(['pre'])
    process.env.INPUT_TYPE = 'lambda'
  })
  it('should generate docs with no template provided', async () => {
    await test(cwd, 'test/lambda/no-template', 'validation.md')
  })
  it('should generate docs with a template provided', async () => {
    process.env.INPUT_TEMPLATE = '../template.md'
    await test(cwd, 'test/lambda/with-template', 'validation.md')
      .finally(() => {
        delete process.env.INPUT_TEMPLATE
      })
  })
  it('should generate docs with specific timeout', async () => {
    await test(cwd, 'test/lambda/timeout', 'validation.md')
  })
  it('should generate docs when no lambdas are defined', async () => {
    await test(cwd, 'test/lambda/no-lambda', 'validation.md')
  })
  it('should support multi-lambda situations', async () => {
    await test(cwd, 'test/lambda/multi-lambda', 'validation.md')
  })
  it('should generate docs with complex path to lambda handler', async () => {
    await test(cwd, 'test/lambda/handler-path', 'validation.md')
  })
  it('should generate docs with multiple sources defined', async () => {
    await test(cwd, 'test/lambda/multi-sources', 'validation.md')
  })
  it('should generate docs without any sources defined', async () => {
    await test(cwd, 'test/lambda/no-source', 'validation.md')
  })
  describe('when using destinations', () => {
    it('should handle on success and on failure', async () => {
      await test(cwd, 'test/lambda/destinations/regular', 'validation.md')
    })
    it('should handle absence of on failure', async () => {
      await test(cwd, 'test/lambda/destinations/no-on-failure', 'validation.md')
    })
    it('should handle absence of on success', async () => {
      await test(cwd, 'test/lambda/destinations/no-on-success', 'validation.md')
    })
    it('should handle SNS and Event Bridge ARNs', async () => {
      await test(cwd, 'test/lambda/destinations/sns-eb-arn', 'validation.md')
    })
    it('should handle Ref intrinsic function', async () => {
      await test(cwd, 'test/lambda/destinations/ref-intrinsic', 'validation.md')
    })
  })
  it('should generate docs with split configuration file', async () => {
    await test(cwd, 'test/lambda/split-config', 'validation.md')
  })
  it('should generate docs when using variable in serverless configuration file', async () => {
    await test(cwd, 'test/lambda/sls-var', 'validation.md')
  })
  it('should support layers', async () => {
    await test(cwd, 'test/lambda/with-layers', 'validation.md')
  })
  after(() => {
    delete process.env.INPUT_TYPE
  })
})
