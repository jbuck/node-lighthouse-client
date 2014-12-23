'use strict';
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var Promise = require('bluebird').Promise;
/**
 * @class ClientMock
 * Respond with matching files in the directory
 * @param {String} directory
 */
function ClientMock(directory) {
    this._directory = directory;
}
_.extend(ClientMock.prototype, /* @lends ClientMock */ {

    get: function (filepath) {
        var fullpath = path.join(this._directory, filepath + '.json');
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