"use strict";
var util = require('util');
var Resource = require('./Resource');

/**
 * @class Token
 * @extends Resource
 */

/**
 * @constructor
 * @param {Object} data
 * @param {Client} client
 * @param {string} url
 */
function Token(data, client, url) {
    Resource.call(this, data, client, url);
    this._wrapper = 'token';
}
/** @property {String} created_at */
/** @property {String} note */
/** @property project_id */
/** @property {Boolean} read_only */
/** @property {String} token */
/** @property {Number} user_id */

util.inherits(Token, Resource);
module.exports = Token;