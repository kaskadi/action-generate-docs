/* eslint-env mocha */
const runAction = require('../helpers/run-action.js')
const steps = ['pre', 'main']
const fs = require('fs')
const chai = require('chai')
chai.should()

describe('action docs generation', function () {
  this.timeout(60000)
  before(async () => {
    process.chdir('test/action')
    process.env.INPUT_TYPE = 'action'
  })
  it('should generate template with no template provided', async () => {
    await runAction(steps)
    const docs = fs.readFileSync('README.md', 'utf8')
    const validation = fs.readFileSync('data/validation-no-template.md', 'utf8')
    docs.should.equal(validation)
  })
  it('should generate template with template provided', async () => {
    process.env.INPUT_TEMPLATE = 'data/template.md'
    await runAction(steps)
    const docs = fs.readFileSync('README.md', 'utf8')
    const validation = fs.readFileSync('data/validation.md', 'utf8')
    docs.should.equal(validation)
  })
  after(() => {
    fs.unlinkSync('README.md')
    process.chdir('../../')
  })
})
