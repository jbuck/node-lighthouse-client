"use strict";
var _ = require('lodash');
var util = require('util');
var Client = require('./Client');
var Resource = require('./Resource');
var Project = require('./Project');
var User = require('./User');

/**
 * @class Account
 * @extends Resource
 * Object oriënted interface for working with the lighthouseapp API.
 */

/**
 * @constructor
 * @param {Client|ClientMock|String} clientOrAccount A Client object or account string
 * @param {Object|String} [auth] Authentication for when clientOrAccount is an acount/string
 *   "my-token"  http://help.lighthouseapp.com/kb/api/how-do-i-get-an-api-token
 *   {token: "my-token"}
 *   {username: "my-username", password: "my-p@ssw0rd"}
 */
function Account(clientOrAccount, auth) {
    if (_.isObject(clientOrAccount)) {
        this._client = clientOrAccount;
    } else if (_.isString(clientOrAccount)) {
        this._client = new Client(clientOrAccount, auth);
    } else {
        throw new Error('Missing required argument: clientOrAccount');
    }
    this._url = '';
}
util.inherits(Account, Resource);
_.extend(Account.prototype, /* @lends Account */ {
    /**
     * Retrieve a list of all projects.
     *
     * @return {Promise|Project[]} projects
     */
    getProjects: function () {
        return this._getCollection('projects', Project);
    },
    /**
     * @private
     * Alias of getProjects()
     */
    allProjects: function () {
        return this.getProjects.apply(this, arguments);
    },
    /**
     * Retrieve a project by id.
     *
     * @param {Number} id
     * @return {Promise|Project} project
     */
    getProject: function (id) {
        return this._getItem('projects/' + id, Project);
    },
    /**
     * Retrieve the current user.
     *
     * @return {Promise|User}
     */
    getProfile: function () {
        return this._getItem('profile', User);
    },
    /**
     * Retrieve details on the given token.
     *
     * @param {String} token
     * @return {Promise|Resource} token
     */
    getToken: function (token) {
        return this._getItem('tokens/' + token);
    }

});
module.exports = Account;