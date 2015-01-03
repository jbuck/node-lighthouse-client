/**
 * Update the fixtures based on the http://node-lighthouse-client.lighthouseapp.com account.
 */

var fs = require('fs');
var _path = require('path');
var _ = require('lodash');
var Promise = require('bluebird').Promise;
var lighthouse = require('../../');

// Configuration
var GENERATE_JSDOC = false;
var client = lighthouse('node-lighthouse-client', '5836fe149e475c7d8849d4315aef720d7523590c');
var paths = [
    'projects',
    'projects/102935',
    'projects/102935/tickets',
    'projects/102935/tickets/1',
    'projects/102935/memberships',
    'projects/102935/milestones',
    'projects/102935/bins',
    'projects/102935/bins/556415',
    'projects/102935/messages',
    'projects/102935/changesets',
    'profile',
    'users/133445',
    'tokens/5836fe149e475c7d8849d4315aef720d7523590c'
];

Promise.all(paths.map(function (path) {
    return client.get(path).then(function (data) {
        var filename = path + '.json';
        fs.writeFileSync(_path.join(__dirname, filename), JSON.stringify(data, null, 4));
        console.log('Written ' + filename);
        if (GENERATE_JSDOC) {
            var struct = (_.isArray(data) ? data[0] : data) || {};
            for (var prop in struct) {
                var type = typeof struct[prop];
                if (_.isNull(struct[prop])) {
                    type = '';
                } else if (_.isArray(struct[prop])) {
                    type = '{Array} ';
                } else {
                    type = '{' + type.charAt(0).toUpperCase() + type.slice(1) + '} ';
                }
                console.log('/** @property ' + type + prop + ' */');
            }
            console.log('');
        }
    });
})).then(function () {
    console.log('done.');
});
