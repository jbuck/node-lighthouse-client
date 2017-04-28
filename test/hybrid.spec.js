"use strict";
var lighthouse = require('../index');
var ClientMock = require('../src/ClientMock');

describe('lighthouse-client module export / hybrid client', function () {

    if (typeof process.env.MOCK === 'undefined' || process.env.MOCK !== '0') {
        var client = lighthouse(new ClientMock(__dirname + '/fixtures'));
    } else {
        var client = lighthouse('node-lighthouse-client', '5836fe149e475c7d8849d4315aef720d7523590c');
    }

    it('lighthouse() should expose the high-level api', function () {
        // The high-level api example in the read me.
        return client.getProfile().then(function (profile) {
            expect(profile.name).toBe("Jon Buckley");
        });
    });

    it('lighthouse() should also expose the low-level api', function () {
        return client.get('users/133445').then(function (user) {
            expect(user.name).toBe("Jon Buckley");
        });
    });

});