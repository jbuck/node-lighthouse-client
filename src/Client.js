'use strict';
var _ = require('lodash');
var nodeUrl = require('url');
var Curl = require("node-curl/lib/Curl");
var Promise = require('bluebird').Promise;

/**
 * @class Client
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
            URL: this._url(path, parameters)
        });
    },
    /**
     * Perform request and cleanup response.
     *
     * @param {Object} options Curl options CURLOPT_*
     * @returns {Promise}
     */
    _api: function (options) {
        options.FAILONERROR = true;
        if (this.token) { // Token based auth?
            options.HTTPHEADER = options.HTTPHEADER || [];
            options.HTTPHEADER.push('X-LighthouseToken: ' + this.token);
        } else if (this.username) { // Basic auth?
            options.USERPW = this.username + ':' + this.password;
        }
        return new Promise(function (resolve, reject) {
            var curl = new Curl();
            for (var prop in options) {
                curl.setopt(prop, options[prop]);
            }
            var bodyText = '';
            curl.on('data', function (chunk) {
                bodyText += chunk;
                return bodyText.length;
            });
            curl.on('error', function (err) {
                err.message = '[' + curl.getinfo('RESPONSE_CODE') + '] ' + err.message;
                curl.close();
                reject(err);
            });
            curl.on('end', function () {
                try {
                    curl.close();
                    var data = JSON.parse(bodyText);
                    var wrapper = Object.keys(data)[0];
                    data = data[wrapper]; // unwrap root container
                    if (_.isArray(data) && data.length > 0) {
                        var itemWrapper = Object.keys(data[0])[0];
                        resolve(data.map(function (item) {
                            return item[itemWrapper];
                        }));
                        return;
                    }
                    resolve(data);
                } catch (err) {
                    reject(err);
                }
            });
            curl.perform();
        });
    },
    /**
     * Build url.
     *
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