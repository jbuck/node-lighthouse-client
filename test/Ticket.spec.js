"use strict";
var assert = require('assert');
var account = require('./helpers/account');
var Ticket = require('../src/Ticket');
var User = require('../src/User');
var TicketBin = require('../src/TicketBin');
var Membership = require('../src/Membership');

describe('Ticket', function () {
    var ticket = null;

    beforeEach(function () {
        if (ticket === null) {
            return account.getProject(102935).then(function (project) {
                return project.getTicket(1).then(function (_ticket) {
                    ticket = _ticket;
                });
                
            });
        }
    });

    it('should be assigned', function () {
        assert.equal(ticket.assigned_user_id, 133445);
        assert.equal(ticket.assigned_user_name, 'Jon Buckley');
    });
});
