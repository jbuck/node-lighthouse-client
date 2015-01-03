"use strict";
var assert = require('assert');
var account = require('./helpers/account');
var Project = require('../src/Project');
var User = require('../src/User');
var Ticket = require('../src/Ticket');

describe('Account', function () {

    it('should list projects', function (done) {
        account.getProjects().then(function (projects) {
            assert(projects[0] instanceof Project);
            assert.equal(projects[0].open_states_list, 'new,open');
            assert.equal(projects[0].closed_states_list, 'resolved,hold,invalid');
            done();
        }).catch(done);
    });

    it('should retrieve a project', function (done) {
        account.getProject(102935).then(function (project) {
            assert(project instanceof Project);
            assert.equal(project.license, 'bsd');
            done();
        }).catch(done);
    });

    it('should retrieve current profile', function (done) {
        account.getProfile().then(function (profile) {
            assert(profile instanceof User);
            assert.equal(profile.name, 'Jon Buckley');
            assert.equal(profile.website, 'jbuckley.ca');
            assert.ok(profile.active_tickets[0] instanceof Ticket);
            done();
        }).catch(done);
    });

    it('should retrieve token info', function (done) {
        account.getToken('5836fe149e475c7d8849d4315aef720d7523590c').then(function (token) {
            assert.equal(token.note, 'node ro');
            assert.equal(token.read_only, true);
            done();
        }).catch(done);
    });
});
