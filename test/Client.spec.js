var assert = require("assert");
var Client = require("../src/Client");

describe('Client', function () {
    it('should retrieve a pubic project without authentication', function (done) {
        var c = new Client('node-lighthouse-client');
        c.get('projects/102935').then(function (project) {
            assert.equal(project.id, 102935);
            assert.equal(project.description, 'A project for testing node-lighthouse-client.');
            done();
        }).catch(done);
    });

    it('should list projects when authenticated', function (done) {
        var c = new Client('node-lighthouse-client', {token: "5836fe149e475c7d8849d4315aef720d7523590c"});
//        var c = new Client('node-lighthouse-client', {username: "the-username", password: 's3cret'}); // basic auth also works
        c.get('projects').then(function (projects) {
            assert.equal(projects[0].id, 102935);
            done();
        }).catch(done);
    });

    it('should list members of a project', function (done) {
        var c = new Client('node-lighthouse-client', {token: "5836fe149e475c7d8849d4315aef720d7523590c"});
        c.get('projects/102935/memberships').then(function (members) {
            assert.equal(members[0].id, 260860);
            assert.equal(members[0].user.id, 133445);
            assert.equal(members[0].user.name, 'Jon Buckley');
            done();
        }).catch(done);
    });

});
