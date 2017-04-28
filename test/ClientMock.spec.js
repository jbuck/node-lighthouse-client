"use strict";
var ClientMock = require("../src/ClientMock");

describe('ClientMock', function () {
    var client = new ClientMock(__dirname + '/fixtures');

    it('should list projects', function () {
        return client.get('projects').then(function (projects) {
            expect(projects[0].id).toBe(102935);
        });
    });

    it('should list members of a project', function () {
        return client.get('projects/102935/memberships').then(function (members) {
            expect(members[0].id).toBe(260860);
            expect(members[0].user.id).toBe(133445);
            expect(members[0].user.name).toBe('Jon Buckley');
        });
    });

    it('should retrieve a project ', function () {
        return  client.get('projects/102935').then(function (project) {
            expect(project.id).toBe(102935);
            expect(project.description).toBe('A project for testing node-lighthouse-client.');
        });
    });
});
