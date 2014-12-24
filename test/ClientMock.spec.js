var assert = require("assert");
var ClientMock = require("../src/ClientMock");

describe('ClientMock', function () {
    var client = new ClientMock(__dirname + '/fixtures');

    it('should list projects', function (done) {

        client.get('projects').then(function (projects) {
            assert.equal(projects[0].id, 102935);
            done();
        }).catch(done);
    });

    it('should list members of a project', function (done) {
        client.get('projects/102935/memberships').then(function (members) {
            assert.equal(members[0].id, 260860);
            assert.equal(members[0].user.id, 133445);
            assert.equal(members[0].user.name, 'Jon Buckley');
            done();
        }).catch(done);
    });

    it('should retrieve a project ', function (done) {

        client.get('projects/102935').then(function (project) {
            assert.equal(project.id, 102935);
            assert.equal(project.description, 'A project for testing node-lighthouse-client.');
            done();
        }).catch(done);
    });
});
