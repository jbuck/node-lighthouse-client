lighthouse-client [![Build Status](https://secure.travis-ci.org/jbuck/node-lighthouse-client.png)](http://travis-ci.org/jbuck/node-lighthouse-client)
=================

A NodeJS client for [Lighthouse](http://lighthouseapp.com)

## Installation

Install using npm: `npm install lighthouse-client`

## Usage (high level api)

```javascript
var lighthouse = require("lighthouse-client");

// For connecting to 'https://myaccount.lighthouseapp.com'
var account = lighthouse("myaccount", "my-token"); // http://help.lighthouseapp.com/kb/api/how-do-i-get-an-api-token
// or
var account = lighthouse("myaccount", {username: "me", password: "my-p@ssword"});

account.getProfile().then(function (profile) {
    console.log(profile.active_tickets);
});
account.getProjects().then(function(projects) {
    projects.forEach(function(project) {
        project.getTickets().then(function (tickets) {
            console.log(project.name);
            console.log(tickets);
        });
    });
});
```

See the [API Documentation](http://jbuck.github.io/node-lighthouse-client/) for more info.

## Usage (low level api)

```javascript
var Client = require("lighthouse-client").Client;
var lighthouseClient = new Client("myaccount", "mytoken");

// To fetch & parse: https://myaccount.lighthouseapp.com/projects/123/tickets.json
lighthouseClient.get('projects/123/tickets', {q: 'responsible:me'}).then(function(tickets) {
    tickets.forEach(function(ticket) {
        console.log(ticket.number, ticket.state);
    });
});
```

For more url and options: http://help.lighthouseapp.com/kb/api/
