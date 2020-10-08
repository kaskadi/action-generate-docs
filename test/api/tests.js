/* eslint-env mocha */
const runAction = require('../helpers/run-action.js')
const test = require('../helpers/test.js')
const chai = require('chai')
chai.should()

const cwd = process.cwd()

describe('api docs generation', function () {
  this.timeout(120000)
  before(async () => {
    await runAction(['pre'])
    process.env.INPUT_TYPE = 'api'
  })
  it('should generate docs with no template provided', async () => {
    await test(cwd, 'test/api/no-template', 'validation.md')
  })
  it('should generate docs with a template provided', async () => {
    process.env.INPUT_TEMPLATE = '../template.md'
    await test(cwd, 'test/api/with-template', 'validation.md')
      .finally(() => {
        delete process.env.INPUT_TEMPLATE
      })
  })
  describe('base URL getter', function () {
    it('should generate docs without hostname specified', async () => {
      await test(cwd, 'test/api/base-url/no-hostname', 'validation.md')
    })
    it('should generate docs without root specified', async () => {
      await test(cwd, 'test/api/base-url/no-root', 'validation.md')
    })
    it('should generate docs with a base URL when specified', async () => {
      await test(cwd, 'test/api/base-url/regular', 'validation.md')
    })
  })
  describe('example builder', function () {
    it('should generate docs with no example', async () => {
      await test(cwd, 'test/api/examples/no-example', 'validation.md')
    })
    it('should generate docs with no example request', async () => {
      await test(cwd, 'test/api/examples/no-request', 'validation.md')
    })
    it('should generate docs with no example response', async () => {
      await test(cwd, 'test/api/examples/no-response', 'validation.md')
    })
    it('should generate docs without query string in example request', async () => {
      await test(cwd, 'test/api/examples/no-qs', 'validation.md')
    })
    it('should generate docs without body in example request', async () => {
      await test(cwd, 'test/api/examples/no-request-body', 'validation.md')
    })
    it('should generate docs without headers in example request', async () => {
      await test(cwd, 'test/api/examples/no-request-headers', 'validation.md')
    })
    it('should generate docs without status code in example response', async () => {
      await test(cwd, 'test/api/examples/no-status-code', 'validation.md')
    })
    it('should generate docs without body in example response', async () => {
      await test(cwd, 'test/api/examples/no-response-body', 'validation.md')
    })
    it('should generate docs without headers in example response', async () => {
      await test(cwd, 'test/api/examples/no-response-headers', 'validation.md')
    })
    it('should generate docs with a text body', async () => {
      await test(cwd, 'test/api/examples/text-body', 'validation.md')
    })
    it('should generate docs with a given example', async () => {
      await test(cwd, 'test/api/examples/single-example', 'validation.md')
    })
    it('should generate docs with multiple examples', async () => {
      await test(cwd, 'test/api/examples/multi-example', 'validation.md')
    })
  })
  it('should generate docs with multiple endpoints (sorting paths alphabetically)', async () => {
    await test(cwd, 'test/api/multi-endpoints', 'validation.md')
  })
  it('should generate docs with no endpoints defined', async () => {
    await test(cwd, 'test/api/no-lambda', 'validation.md')
  })
  it('should generate docs with layers attached to an endpoint', async () => {
    await test(cwd, 'test/api/with-layer', 'validation.md')
  })
  it('should generate docs when no kaskadi-docs field has been provided for a given method', async () => {
    await test(cwd, 'test/api/no-custom-field', 'validation.md')
  })
  it('should generate docs with multiple events assigned to a lambda', async () => {
    await test(cwd, 'test/api/multi-events', 'validation.md')
  })
  it('should generate docs with multiple lambda assigned to the same path', async () => {
    await test(cwd, 'test/api/multi-lambda', 'validation.md')
  })
  after(() => {
    delete process.env.INPUT_TYPE
  })
})
