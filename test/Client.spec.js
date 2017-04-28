"use strict";
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

    it('should list projects when authenticated', function () {
        return allProjectsPromise.then(function (projects) {
            expect(projects[0].id).toBe(102935);
        });
    });

    it('should list members of a project', function () {
        return membersPromise.then(function (members) {
            expect(members[0].id).toBe(260860);
            expect(members[0].user.id).toBe(133445);
            expect(members[0].user.name).toBe('Jon Buckley');
        });
    });

    it('should retrieve a pubic project without authentication', function () {
        return publicProjectPromise.then(function (project) {
            expect(project.id).toBe(102935);
            expect(project.description).toBe('A project for testing node-lighthouse-client.');
        });
    });

});
