"use strict";
var util = require('util');
var Resource = require('./Resource');

/**
 * @class User
 * @extends Resource
 *
 * @param {Object} data
 * @param {Client} client
 * @param {string} url
 */
function User(data, client, url) {
    Resource.call(this, data, client, url);
    this._wrapper = 'user';
}
util.inherits(User, Resource);
module.exports = User;