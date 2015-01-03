"use strict";
var util = require('util');
var Resource = require('./Resource');

/**
 * @class Ticket
 * @extends Resource
 */

/**
 * @constructor
 * @param {Object} data
 * @param {Client} client
 * @param {string} url
 */
function Ticket(data, client, url) {
    Resource.call(this, data, client, url);
    this._wrapper = 'ticket';
    if (this.project_id && this.number) {
        this._url = 'projects/' + this.project_id + '/tickets/' + this.number;
    }
}
/** @property assigned_user_id */
/** @property {Number} attachments_count */
/** @property {Boolean} closed */
/** @property {String} created_at */
/** @property {Number} creator_id */
/** @property {Number} importance */
/** @property milestone_due_on */
/** @property milestone_id */
/** @property {Number} milestone_order */
/** @property {Number} number */
/** @property {String} permalink */
/** @property {Number} project_id */
/** @property raw_data */
/** @property {Boolean} spam */
/** @property {String} state */
/** @property tag */
/** @property {String} title */
/** @property {String} updated_at */
/** @property {Number} user_id */
/** @property {Number} version */
/** @property {Array} watchers_ids */
/** @property {String} user_name */
/** @property {String} creator_name */
/** @property {String} url */
/** @property {Number} priority */
/** @property {String} original_body */
/** @property {String} latest_body */
/** @property {String} original_body_html */
/** @property {String} state_color */

util.inherits(Ticket, Resource);
module.exports = Ticket;