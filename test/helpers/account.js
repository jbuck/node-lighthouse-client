"use strict";
var Account = require('../../src/Account');
var ClientMock = require('../../src/ClientMock');

/**
 * The account that is used in the unittests.
 * Makes it easy to test against the real API instead of the mocked API.
 */

if (typeof process.env.MOCK === 'undefined' || process.env.MOCK !== '0') {
    module.exports =  new Account(new ClientMock(__dirname + '/../fixtures'));
} else {
    // Use the real api when `MOCK=0` is set in the environment
    module.exports = new Account('node-lighthouse-client', "5836fe149e475c7d8849d4315aef720d7523590c");
}