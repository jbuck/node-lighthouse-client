"use strict";
var _ = require('lodash');
var nodeUrl = require('url');
var axios = require('axios');

/**
 * @class Client
 * Low-level client for making requests to the lighthouseapp API.
 */

/**
 * @constructor
 * @param {String} account
 * @param {Object|String} [auth] For example:
 *   "my-token"  http://help.lighthouseapp.com/kb/api/how-do-i-get-an-api-token
 *   {token: "my-token"}
 *   {username: "my-username", password: "my-password"}
 */
function Client(account, auth) {
    this.account = account;
    if (typeof auth === 'string') {
        this.token = auth;
    } else {
        auth = auth || {};
        this.token = auth.token;
        this.username = auth.username;
        this.password = auth.password;
    }
}

_.extend(Client.prototype, /* @lends Client */ {
    /**
     * Perform a GET request.
     *
     * @param {String} path
     * @param {Object|String} [parameters]
     * @returns {Promise}
     */
    get: function (path, parameters) {
        return this._api({
            url: this._url(path, parameters)
        });
    },

    /**
     * Perform request and cleanup response.
     *
     * @private
     * @param {Object} options axiosConfig
     * @returns {Promise}
     */
    _api: function (options) {
        if (this.token) { // Token based auth?
            options.headers = options.headers || {};
            options.headers['X-LighthouseToken'] = this.token;
        } else if (this.username) {
            options.auth = {
                username: this.username,
                password: this.password
            };
        }
        return axios(options).then(function (response) {
            var data = response.data;
            var wrapper = Object.keys(response.data)[0];
            var data = data[wrapper]; // unwrap root container
            if (Array.isArray(data) && data.length > 0) {
                var itemWrapper = Object.keys(data[0])[0];
                return data.map(function (item) {
                    return item[itemWrapper];
                });
            }
            return data;
        });
    },

    /**
     * Build url.
     *
     * @private
     * @param {String} path
     * @param {Object|String} parameters
     * @returns {String}
     */
    _url: function (path, parameters) {
        return nodeUrl.format({
            protocol: 'https',
            host: this.account + '.lighthouseapp.com',
            pathname: path + '.json',
            query: parameters
        });
    }
});

module.exports = Client;