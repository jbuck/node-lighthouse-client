"use strict";
var util = require('util');
var Resource = require('./Resource');

/**
 * @class Message
 * @extends Resource
 */

/**
 * @constructor
 * @param {Object} data
 * @param {Client} client
 * @param {string} url
 */
function Message(data, client, url) {
    Resource.call(this, data, client, url);
    this._wrapper = 'message';
}

util.inherits(Message, Resource);
module.exports = Message;