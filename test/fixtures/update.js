/**
 * Update the fixtures based on the http://node-lighthouse-client.lighthouseapp.com account.
 */

var fs = require('fs');
var _path = require('path');
var Promise = require('bluebird').Promise;
var Client = require('../../').Client;

var c = new Client('node-lighthouse-client', "5836fe149e475c7d8849d4315aef720d7523590c");

var paths= [
    'projects',
    'projects/102935',
    'projects/102935/tickets',
    'projects/102935/memberships',
    'projects/102935/milestones',
    'projects/102935/bins',
    'projects/102935/messages',
    'projects/102935/changesets',
    'profile',
    'users/133445',
    'tokens/5836fe149e475c7d8849d4315aef720d7523590c'
];

Promise.all(paths.map(function (path) {
    return c.get(path).then(function (data) {
        var filename = path + '.json';
        fs.writeFileSync(_path.join(__dirname, filename ), JSON.stringify(data, null, 4));
        console.log('Written ' + filename);
    });
})).then(function () {
console.log('done.');
});



