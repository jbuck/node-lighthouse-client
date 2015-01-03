"use strict";
var assert = require('assert');
var account = require('./helpers/account');
var Ticket = require('../src/Ticket');
var User = require('../src/User');
var TicketBin = require('../src/TicketBin');
var Membership = require('../src/Membership');

describe('Project', function () {
    var project = null;

    beforeEach(function () {
        if (project === null) {
            return account.getProject(102935).then(function (_project) {
                project = _project;
            });
        }
    });

    it('should list tickets', function (done) {
        project.getTickets().then(function (tickets) {
            assert(tickets[0] instanceof Ticket);
            assert.equal(tickets[0].title, 'Testing 456');
            done();
        }).catch(done);
    });

    it('should retrieve a ticket by number', function (done) {
        project.getTicket(1).then(function (ticket) {
            assert(ticket instanceof Ticket);
            assert.equal(ticket.title, 'Testing 123');
            done();
        }).catch(done);
    });

    it('should list memberships', function (done) {
        project.getMemberships().then(function (memberships) {
            assert.ok(memberships[0] instanceof Membership);
            assert.equal(memberships[0].id, 260860, 'id of the membership relation');
            assert(memberships[0].user instanceof User);
            assert.equal(memberships[0].user.id, 133445, 'id of the user');
            assert.equal(memberships[0].user.name, 'Jon Buckley');
            done();
        }).catch(done);
    });

    it('should retrieve membership by id', function (done) {
        project.getMemberships().then(function (memberships) {
            assert.ok(memberships[0] instanceof Membership);
            assert.equal(memberships[0].id, 260860, 'id of the membership relation');
            assert(memberships[0].user instanceof User);
            assert.equal(memberships[0].user.id, 133445, 'id of the user');
            assert.equal(memberships[0].user.name, 'Jon Buckley');
            done();
        }).catch(done);
    });

    it('should list milestones', function (done) {
        project.getMilestones().then(function (milestones) {
            assert.equal(0, milestones.length);
            done();
        }).catch(done);
    });

    it('should list messages', function (done) {
        project.getMessages().then(function (messages) {
            assert.equal(0, messages.length);
            done();
        }).catch(done);
    });
    it('should list bins', function (done) {
        project.getTicketBins().then(function (bins) {
            assert(bins[0] instanceof TicketBin);
            assert.equal(bins[0].name, "Open tickets");
            assert.equal(bins[0].query, "state:open");
            done();
        }).catch(done);
    });
    it('should retrieve a bin by id', function (done) {
        project.getTicketBin(556415).then(function (bin) {
            assert(bin instanceof TicketBin);
            assert.equal(bin.name, "Open tickets");
            assert.equal(bin.query, "state:open");
            done();
        }).catch(done);
    });

    it('should list changesets', function (done) {
        project.getChangesets().then(function (changesets) {
            assert.equal(0, changesets.length);
            done();
        }).catch(done);
    });
});
