lighthouse-client [![Build Status](https://secure.travis-ci.org/jbuck/node-lighthouse-client.png)](http://travis-ci.org/jbuck/node-lighthouse-client)
=================

A NodeJS client for [Lighthouse](http://lighthouseapp.com)

Quick start
-----------

Install using npm: `npm install lighthouse-client`

Configure an instance of the client with some default options:

    var Client = require("lighthouse-client").Client;
    // https://myaccount.lighthouseapp.com
    // http://help.lighthouseapp.com/kb/api/how-do-i-get-an-api-token
    var c = new Client("myaccount", "mytoken");

Do something cool with it, like list the projects on your account:

    c.get('projects').then(function(projects) {
      projects.forEach(function(project) {
        console.log(project.name + " - " + project.id);
      });
    });

Documentation
-------------

http://help.lighthouseapp.com/kb/api/

var c = new Client('myaccount');
c.get('projects/123/tickets'); // fetches & parses: https://myaccount.lighthouseapp.com/projects/123/tickets.json