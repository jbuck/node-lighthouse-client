'use strict';
var _ = require('lodash');
var request = require("request-promise");

/**
 * @class Client
 * @param {String} account
 * @param {Object} auth
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
     * @param {Object} query parameters
     * @returns {Promise}
     */
    get: function (path, parameters) {
        return this._api({
            url: this._url(path),
            qs: parameters
        });
    },
    /**
     * Perform request and cleanup json response
     *
     * @param {Object} method
     * @returns {Promise}
     */
    _api: function (options) {
        if (this.token) { // Token based auth?
            options.headers = options.headers || {};
            options.headers['X-LighthouseToken'] = this.token;
        } else if (this.username) { // Basic auth?
            options.auth = options.auth || {};
            options.auth.user = this.username;
            options.auth.pass = this.password;
        }
        return request(options).then(function (response) {
            var data = JSON.parse(response);
            var wrapper = Object.keys(data)[0];
            data = data[wrapper]; // unwrap root container
            if (_.isArray(data) && data.length > 0) {
                var itemWrapper = Object.keys(data[0])[0];
                return data.map(function (item) {
                    return item[itemWrapper];
                });
            }
            return data;
        }).catch(function (err) {
            if (err.error) {
                throw new Error(err.error);
            }
            throw err;
        });
    },
    /**
     * Build url.
     *
     * @param {Path} path
     * @returns {String}
     */
    _url: function (path) {
        return 'https://' + this.account + '.lighthouseapp.com/' + path + '.json';
    }
});

module.exports = Client;