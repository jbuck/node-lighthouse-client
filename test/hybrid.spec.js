"use strict";
var lighthouse = require('../index');
var assert = require("assert");
var ClientMock = require('../src/ClientMock');

describe('lighthouse-client module export / hybrid client', function () {

    var client = lighthouse(new ClientMock(__dirname + '/fixtures'));
    // var client = lighthouse('node-lighthouse-client', '5836fe149e475c7d8849d4315aef720d7523590c');


    it('lighthouse() should expose the high-level api', function (done) {
        // The high-level api example in the read me.

        client.getProfile().then(function (profile) {
            assert.equal(profile.name, "Jon Buckley");
            done();
        }).catch(done);
    });

    it('lighthouse() should also expose the low-level api', function (done) {

        client.get('users/133445').then(function (user) {
            assert.equal(user.name, "Jon Buckley");
            done();
        }).catch(done);
    });

});