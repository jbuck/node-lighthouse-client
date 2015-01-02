"use strict";
var util = require('util');
var Resource = require('./Resource');
var User = require('./User');

/**
 * @class Membership
 * @extends Resource
 */

/**
 * @constructor
 * @param {Object} data
 * @param {Client} client
 * @param {string} url
 */
function Membership(data, client, url) {
    Resource.call(this, data, client, url);
    this._wrapper = 'membership';
    if (this.user && !(this.user instanceof User)) {
        this.user = new User(this.user, client);
    }
}
/** @property {Number} id */
/** @property {Number} user_id */
/** @property {Object} user */
/** @property {String} account */

util.inherits(Membership, Resource);
module.exports = Membership;
