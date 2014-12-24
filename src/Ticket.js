"use strict";
var util = require('util');
var Resource = require('./Resource');

/**
 * @class Ticket
 * @extends Resource
 *
 * @param {Object} data
 * @param {Client} client
 * @param {string} url
 */
function Ticket(data, client, url) {
    Resource.call(this, data, client, url);
    this._wrapper = 'ticket';
}
util.inherits(Ticket, Resource);
module.exports = Ticket;