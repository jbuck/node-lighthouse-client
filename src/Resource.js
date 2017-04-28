"use strict";
var _ = require('lodash');

/**
 * @class Resource
 * Abstract baseclass for the resources.
 */

/**
 * @constructor
 * @param {Object} data
 * @param {Client} client
 * @param {String} url
 */
function Resource(data, client, url) {
    _.extend(this, data);
    this._client = client;
    this._url = url;
}
_.extend(Resource.prototype, /* @lends Resource */ {
    /**
     * Called by JSON.stringify()
     * Prepares the resource to be send to the API.
     */
    toJSON: function () {
        var data = _.clone(this);
        // Remove properties that start with "_"
        _.keys(data).forEach(function (property) {
            if (property[0] === '_') {
                delete data[property];
            }
        });
        // Wrap the properties into the wrapper.
        // Example: {id: 1} becomes {project: {id: 1}}
        if (this._wrapper) {
            var wrapped = {};
            wrapped[this._wrapper] = data;
            return wrapped;
        }
        return data;
    },
    /**
     * @private
     * @param {String} subpath
     * @param {Resource} Model The model to wrap the data in.
     */
    _getCollection: function (subpath, Model, parameters) {
        if (_.isUndefined(this._url)) {
            return Promise.reject('_url must be known when loading related resources');
        }
        var url = this._url + '/' + subpath;
        if (!Model) {
            Model = Resource;
        }
        var client = this._client;
        return client.get(url, parameters).then(function (items) {
            return items.map(function (data) {
                return new Model(data, client, url + '/' + (data.id || data.number));
            });
        });
    },
    /**
     * @private
     * @param {String} subpath
     * @param {Resource} Model The model to wrap the data in.
     */
    _getItem: function (subpath, Model) {
        if (_.isUndefined(this._url)) {
            return Promise.reject('_url must be known when loading a related resource');
        }
        var url = this._url + '/' + subpath;
        if (!Model) {
            Model = Resource;
        }
        var client = this._client;
        return client.get(url).then(function (data) {
            return new Model(data, client);
        });
    }
});
module.exports = Resource;