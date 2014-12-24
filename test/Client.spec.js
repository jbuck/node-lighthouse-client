"use strict";
var assert = require("assert");
var Client = require("../src/Client");

describe('Client', function () {
    var authenticated = new Client('node-lighthouse-client', "5836fe149e475c7d8849d4315aef720d7523590c");
    // authentication using username/password is also available:
    // var authenticated = new Client('node-lighthouse-client', {username: "the-username", password: 's3cret'});
    var anonymous = new Client('node-lighthouse-client');

    // Start fetching before the it()s so the requests are in run in paralell
    // causes the first it() to take the hit in terms of ms. (~1s on first run, 250ms when cURL is warmed up)
    var allProjectsPromise = authenticated.get('projects');
    var membersPromise = authenticated.get('projects/102935/memberships');
    var publicProjectPromise = anonymous.get('projects/102935');

    it('should list projects when authenticated', function (done) {
        allProjectsPromise.then(function (projects) {
            assert.equal(projects[0].id, 102935);
            done();
        }).catch(done);
    });

    it('should list members of a project', function (done) {

        membersPromise.then(function (members) {
            assert.equal(members[0].id, 260860);
            assert.equal(members[0].user.id, 133445);
            assert.equal(members[0].user.name, 'Jon Buckley');
            done();
        }).catch(done);
    });

    it('should retrieve a pubic project without authentication', function (done) {

        publicProjectPromise.then(function (project) {
            assert.equal(project.id, 102935);
            assert.equal(project.description, 'A project for testing node-lighthouse-client.');
            done();
        }).catch(done);
    });

});
