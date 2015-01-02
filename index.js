"use strict";
var Account = require('./src/Account');
var _ = require('lodash');

/**
 * Create a hybrid client, capable of both high-level api calls as low-level api calls.
 * @param {Client|String} clientOrAccount
 * @param {Object|String} [auth] Authentication information
 * @returns {Account|Client}
 */
function lighthouseClient(clientOrAccount, auth) {
    // create a new high-level api client.
    var hybrid = new Account(clientOrAccount, auth);
    // mixin public low-level api calls.
    hybrid.get = function () {
        return this._client.get.apply(this._client, arguments);
    };
    hybrid.post = function () {
        return this._client.post.apply(this._client, arguments);
    };
    hybrid.put = function () {
        return this._client.put.apply(this._client, arguments);
    };
    hybrid.delete = function () {
        return this._client.delete.apply(this._client, arguments);
    };
    return hybrid;
}
_.extend(lighthouseClient, {
    Account: Account,
    Changeset: require('./src/Changeset'),
    Client: require('./src/Client'),
    ClientMock: require('./src/ClientMock'),
    Membership: require('./src/Membership'),
    Message: require('./src/Message'),
    Milestone: require('./src/Milestone'),
    Project: require('./src/Project'),
    Resource: require('./src/Resource'),
    Ticket: require('./src/Ticket'),
    TicketBin: require('./src/TicketBin'),
    Token: require('./src/Token'),
    User: require('./src/User')
});

module.exports = lighthouseClient;