"use strict";
var util = require('util');
var _ = require('lodash');
var Resource = require('./Resource');
var Ticket = require('./Ticket');
var Milestone = require('./Milestone');
var User = require('./User');
/**
 * @class Project
 * @extends Resource
 * http://help.lighthouseapp.com/kb/api/projects
 *
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
        var client = this._client;
        return this._getCollection('memberships').then(function (memberships) {
            return memberships.map(function (membership) {
                membership.user = new User(membership.user, client, 'users/', membership.user.id);
                return membership;
            });
        });
    },
    /**
     * Retrieve a list of ticket bins.
     * http://help.lighthouseapp.com/kb/api/ticket-bins
     * @return {Promise|Resource[]} bins
     */
    getTicketBins: function () {
        return this._getCollection('bins');
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
     * @return {Promise|Resource[]} messages
     */
    getMessages: function () {
        return this._getCollection('messages');
    },
    /**
     * Retrieve a list of changesets.
     * http://help.lighthouseapp.com/kb/api/changesets
     * @return {Promise|Resource[]}changesets
     */
    getChangesets: function () {
        return this._getCollection('changesets');
    },

});
module.exports = Project;