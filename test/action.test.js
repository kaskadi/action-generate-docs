/* eslint-env mocha */
const runAction = require('./helpers/run-action.js')
const chai = require('chai')
const { assert } = require('chai')
chai.should()

// *************
// Write your tests here
describe('template-action', function () {
  // ******* DO NOT REMOVE THIS TEST!
  require('./pre/tests.js')
  // *******

  // ******* Example test
  describe('Placeholder test', function () {
    this.timeout(30000)
    before(async function () {
      await runAction(['pre', 'main', 'post'])
    })
    it('should pass', function () {
      const exp = true
      assert(exp === true, 'This cannot fail!')
    })
  })
  // *******
})
// *************
