"use strict";
var util = require('util');
var _ = require('lodash');
var Resource = require('./Resource');
var Ticket = require('./Ticket');
var TicketBin = require('./TicketBin');
var Milestone = require('./Milestone');
var Membership = require('./Membership');
var Changeset = require('./Changeset');
var Message = require('./Message');

/**
 * @class Project
 * @extends Resource
 * http://help.lighthouseapp.com/kb/api/projects
 */

/**
 * @constructor
 * @param {Object} data
 * @param {Client} client
 * @param {string} url
 */
function Project(data, client, url) {
    Resource.call(this, data, client, url);
    this._wrapper = 'project';
    if (!url && this.id) {
        this._url = 'projects/' + this.id;
    }
}
/** @property {Boolean} archived */
/** @property {String} closed_states */
/** @property {String} created_at */
/** @property default_assigned_user_id */
/** @property default_milestone_id */
/** @property default_ticket_text */
/** @property {String} description */
/** @property {String} description_html */
/** @property {Boolean} enable_points */
/** @property {Boolean} hidden */
/** @property {Number} id */
/** @property {String} license */
/** @property {String} name */
/** @property {String} open_states */
/** @property {Number} open_tickets_count */
/** @property {Boolean} oss_readonly */
/** @property {String} permalink */
/** @property points_scale */
/** @property {Boolean} public */
/** @property {Boolean} send_changesets_to_events */
/** @property {Object} todos_completed */
/** @property {String} updated_at */
/** @property {String} open_states_list */
/** @property {String} closed_states_list */

util.inherits(Project, Resource);
_.extend(Project.prototype, /* @lends Project */ {
    /**
     * Retrieve a paged list of tickets.
     * http://help.lighthouseapp.com/kb/api/tickets
     *
     * @param {Object} parameters
     * {
     *     q: 'state:open sort:importance', // http://help.lighthouseapp.com/kb/getting-started/how-do-i-search-for-tickets
     *     limit: 30, // Number of tickets per page: Default: 30, Max: 100
     *     page: 1, //
     * }
     * @return {Promise|Ticket[]} tickets
     */
    getTickets: function (parameters) {
        return this._getCollection('tickets', Ticket);
    },
    /**
     * Retrieve a list of all memberships.
     * http://help.lighthouseapp.com/kb/api/users-and-membership
     * @return {Promise|Resource[]} memberships
     */
    getMemberships: function () {
        return this._getCollection('memberships', Membership);
    },
    /**
     * Retrieve a list of ticket bins.
     * http://help.lighthouseapp.com/kb/api/ticket-bins
     * @return {Promise|Resource[]} bins
     */
    getTicketBins: function () {
        return this._getCollection('bins', TicketBin);
    },
    /**
     * Retrieve a list of milestones.
     * http://help.lighthouseapp.com/kb/api/milestones
     * @return {Promise|Milestone[]} milestones
     */
    getMilestones: function () {
        return this._getCollection('milestones', Milestone);
    },
    /**
     * Retrieve a list of messages.
     * http://help.lighthouseapp.com/kb/api/messages
     * @return {Promise|Message[]} messages
     */
    getMessages: function () {
        return this._getCollection('messages', Message);
    },
    /**
     * Retrieve a list of changesets.
     * http://help.lighthouseapp.com/kb/api/changesets
     * @return {Promise|Changeset[]}changesets
     */
    getChangesets: function () {
        return this._getCollection('changesets', Changeset);
    },
});
module.exports = Project;