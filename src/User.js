"use strict";
var util = require('util');
var Resource = require('./Resource');
var Ticket = require('./Ticket');

/**
 * @class User
 * @extends Resource
 * A public representation of the user with name, job, and website attributes.
 *
 * http://help.lighthouseapp.com/kb/api/users-and-membership
 */

/**
 * @constructor
 * @param {Object} data
 * @param {Client} client
 * @param {string} url
 */
function User(data, client, url) {
    Resource.call(this, data, client, url);
    this._wrapper = 'user';
    if (this.active_tickets && this.active_tickets.length) {
        this.active_tickets = this.active_tickets.map(function (item) {
            return new Ticket(item, client);
        });
    }
    if (!this._url && this.id) {
        this._url = 'users/' + this.id;
    }
}
/** @property {Number} id */
/** @property {String} job */
/** @property {String} name */
/** @property {String} website */
/** @property {String} avatar_url */
/** @property {Ticket[]} active_tickets */

util.inherits(User, Resource);
module.exports = User;