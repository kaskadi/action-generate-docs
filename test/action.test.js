/* eslint-env mocha */
const chai = require('chai')
chai.should()

describe('template-action', function () {
  // ******* DO NOT REMOVE THIS TEST!
  require('./pre/tests.js')
  // *******
  it('should error when using a non supported repository type', async function () {
    this.timeout(30000)
    process.env.INPUT_TYPE = 'hello'
    const runAction = require('./helpers/run-action.js')
    const { existsSync } = require('fs')
    await runAction(['main'])
    existsSync('test/README.md').should.equal(false)
  })
  require('./action/tests.js')
  require('./package/tests.js')
  require('./layer/tests.js')
  require('./lambda/tests.js')
})
