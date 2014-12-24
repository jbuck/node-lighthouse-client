"use strict";
var Account = require('./src/Account');
var _ = require('lodash');

function lighthouse(clientOrAccount, auth) {
    return new Account(clientOrAccount, auth);
}
_.extend(lighthouse, {
    Account: Account,
    Client: require('./src/Client'),
    ClientMock: require('./src/ClientMock'),
    Milestone: require('./src/Milestone'),
    Project: require('./src/Project'),
    Resource: require('./src/Resource'),
    Ticket: require('./src/Ticket'),
    User: require('./src/User')
});

module.exports = lighthouse;