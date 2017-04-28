"use strict";
var account = require('./helpers/account');

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
        expect(ticket.assigned_user_id).toBe(133445);
        expect(ticket.assigned_user_name).toBe('Jon Buckley');
    });
});
