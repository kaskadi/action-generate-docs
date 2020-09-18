/* eslint-env mocha */
const runAction = require('./helpers/run-action.js')
const { existsSync } = require('fs')
const chai = require('chai')
chai.should()

describe('template-action', function () {
  // ******* DO NOT REMOVE THIS TEST!
  require('./pre/tests.js')
  // *******
  it('should error when using a non supported repository type', async function () {
    process.env.INPUT_TYPE = 'hello'
    await runAction(['main'])
    existsSync('test/README.md').should.equal(false)
  })
  require('./action/tests.js')
  require('./package/tests.js')
})
