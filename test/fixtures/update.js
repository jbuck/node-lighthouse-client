/**
 * Update the fixtures based on the http://node-lighthouse-client.lighthouseapp.com account.
 */

var fs = require('fs');
var _path = require('path');
var _ = require('lodash');
var Promise = require('bluebird').Promise;
var Client = require('../../').Client;

// Configuration
var GENERATE_JSDOC = false;
var PROJECT_ID = 102935;
var USER_ID = 133445;
var TOKEN = '5836fe149e475c7d8849d4315aef720d7523590c'
var c = new Client('node-lighthouse-client', TOKEN);
var paths = [
    'projects',
    'projects/' + PROJECT_ID,
    'projects/' + PROJECT_ID + '/tickets',
    'projects/' + PROJECT_ID + '/memberships',
    'projects/' + PROJECT_ID + '/milestones',
    'projects/' + PROJECT_ID + '/bins',
    'projects/' + PROJECT_ID + '/messages',
    'projects/' + PROJECT_ID + '/changesets',
    'profile',
    'users/' + USER_ID,
    'tokens/' + TOKEN
];

Promise.all(paths.map(function (path) {
    return c.get(path).then(function (data) {
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
