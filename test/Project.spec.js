"use strict";
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

    it('should list tickets', function () {
        return project.getTickets().then(function (tickets) {
            expect(tickets[0]).toBeInstanceOf(Ticket);
            expect(tickets[0].title).toBe('Testing 456');
        });
    });

    it('should retrieve a ticket by number', function () {
        return project.getTicket(1).then(function (ticket) {
            expect(ticket).toBeInstanceOf(Ticket);
            expect(ticket.title).toBe('Testing 123');
        });
    });

    it('should list memberships', function () {
        return project.getMemberships().then(function (memberships) {
            expect(memberships[0]).toBeInstanceOf(Membership);
            expect(memberships[0].id).toBe(260860); // id of the membership relation
            expect(memberships[0].user).toBeInstanceOf(User);
            expect(memberships[0].user.id).toBe(133445); // id of the user
            expect(memberships[0].user.name).toBe('Jon Buckley');
        });
    });

    it('should retrieve membership by id', function () {
        return project.getMemberships().then(function (memberships) {
            expect(memberships[0]).toBeInstanceOf(Membership);
            expect(memberships[0].id).toBe(260860); // id of the membership relation
            expect(memberships[0].user).toBeInstanceOf(User);
            expect(memberships[0].user.id).toBe(133445); // id of the user
            expect(memberships[0].user.name).toBe('Jon Buckley');
        });
    });

    it('should list milestones', function () {
        return project.getMilestones().then(function (milestones) {
            expect(milestones.length).toBe(0);
        });
    });

    it('should list messages', function () {
        return project.getMessages().then(function (messages) {
            expect(messages.length).toBe(0);
        });
    });
    it('should list bins', function () {
        return project.getTicketBins().then(function (bins) {
            expect(bins[0]).toBeInstanceOf(TicketBin);
            expect(bins[0].name).toBe("Open tickets");
            expect(bins[0].query).toBe("state:open");
        });
    });
    it('should retrieve a bin by id', function () {
        return project.getTicketBin(556415).then(function (bin) {
            expect(bin).toBeInstanceOf(TicketBin);
            expect(bin.name).toBe("Open tickets");
            expect(bin.query).toBe("state:open");
        });
    });

    it('should list changesets', function () {
        return project.getChangesets().then(function (changesets) {
            expect(changesets.length).toBe(0);
        });
    });
});
