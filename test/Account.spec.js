"use strict";
var account = require('./helpers/account');
var Project = require('../src/Project');
var User = require('../src/User');
var Ticket = require('../src/Ticket');

describe('Account', function () {

    it('should list projects', function () {
        return account.getProjects().then(function (projects) {
            expect(projects[0]).toBeInstanceOf(Project);
            expect(projects[0].open_states_list).toBe('new,open');
            expect(projects[0].closed_states_list).toBe('resolved,hold,invalid');
        });
    });

    it('should retrieve a project', function () {
        return account.getProject(102935).then(function (project) {
            expect(project).toBeInstanceOf(Project);
            expect(project.license).toBe('bsd');
        });
    });

    it('should retrieve current profile', function () {
        return account.getProfile().then(function (profile) {
            expect(profile).toBeInstanceOf(User);
            expect(profile.name).toBe('Jon Buckley');
            expect(profile.website).toBe('jbuckley.ca');
            expect(profile.active_tickets[0]).toBeInstanceOf(Ticket);
        });
    });

    it('should retrieve token info', function () {
        return account.getToken('5836fe149e475c7d8849d4315aef720d7523590c').then(function (token) {
            expect(token.note).toBe('node ro');
            expect(token.read_only).toBe(true);
        });
    });
});
