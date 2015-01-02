"use strict";
var util = require('util');
var Resource = require('./Resource');

/**
 * @class Milestone
 * @extends Resource
 */

/**
 * @constructor
 * @param {Object} data
 * @param {Client} client
 * @param {string} url
 */
function Milestone(data, client, url) {
    Resource.call(this, data, client, url);
    this._wrapper = 'milestone';
}
util.inherits(Milestone, Resource);
module.exports = Milestone;