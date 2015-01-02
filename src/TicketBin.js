"use strict";
var util = require('util');
var Resource = require('./Resource');

/**
 * @class TicketBin
 * @extends Resource
 */

/**
 * @constructor
 * @param {Object} data
 * @param {Client} client
 * @param {string} url
 */
function TicketBin(data, client, url) {
    Resource.call(this, data, client, url);
    this._wrapper = 'ticket_bin';
}
/** @property default */
/** @property {Number} id */
/** @property {String} name */
/** @property {Number} position */
/** @property {Number} project_id */
/** @property {String} query */
/** @property {Boolean} shared */
/** @property {Number} tickets_count */
/** @property {String} updated_at */
/** @property {Number} user_id */
/** @property {Boolean} global */

util.inherits(TicketBin, Resource);
module.exports = TicketBin;