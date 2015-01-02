"use strict";
var Account = require('../../src/Account');
var ClientMock = require('../../src/ClientMock');

/**
 * The account that is used in the unittests.
 * Makes it easy to test against the real API instead of the mocked API.
 */

//*
module.exports =  new Account(new ClientMock(__dirname + '/../fixtures'));
/*/
module.exports = new Account('node-lighthouse-client', "5836fe149e475c7d8849d4315aef720d7523590c");
//*/