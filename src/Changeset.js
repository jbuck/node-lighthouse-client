"use strict";
var util = require('util');
var Resource = require('./Resource');

/**
 * @class Changeset
 * @extends Resource
 */

/**
 * @constructor
 * @param {Object} data
 * @param {Client} client
 * @param {string} url
 */
function Changeset(data, client, url) {
    Resource.call(this, data, client, url);
    this._wrapper = 'changeset';
}

util.inherits(Changeset, Resource);
module.exports = Changeset;