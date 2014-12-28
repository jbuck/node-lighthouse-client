'use strict';
var _ = require('lodash');
var fs = require('fs');
var nodePath = require('path');
var Promise = require('bluebird').Promise;
/**
 * @class ClientMock
 * Similar api as the Client class, but responds with json files from a local directory.
 */

/**
 * @constructor
 * @param {String} directory
 */
function ClientMock(directory) {
    this._directory = directory;
}
_.extend(ClientMock.prototype, /* @lends ClientMock */ {

    /**
     * Simulate a GET request.
     *
     * @param {String} path
     */
    get: function (path) {
        var fullpath = nodePath.join(this._directory, path + '.json');
        return (new Promise(function (resolve, reject) {
            fs.readFile(fullpath, 'utf-8', function (err, file) {
                if (err) {
                    reject(err);
                } else {
                    resolve(file);
                }
            });
        })).then(function (contents) {
            return JSON.parse(contents);
        });
    }

});
module.exports = ClientMock;