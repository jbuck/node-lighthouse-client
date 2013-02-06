var request = require("request"),
    extend = require("node.extend");

function endpoint(account, path) {
  return "https://" + account + ".lighthouseapp.com" + path;
}

function prep(defaults, internal) {
  return function(options, callback) {
    if (!callback) {
      callback = options;
      options = {};
    }

    if (!options) {
      options = {};
    }

    options = extend({}, defaults, options);

    if (!options.account) {
      process.nextTick(function() {
        callback("You did not specify a Lighthouse account");
      });
      return;
    }

    if (!options.token) {
      process.nextTick(function() {
        callback("You did not specify a Lighthouse token");
      });
      return;
    }

    internal(options, callback);
  }
}

module.exports = function(defaults) {
  defaults = defaults || {};

  return {
    defaults: defaults,

    // Milestones
    listMilestones: prep(defaults, function(options, callback) {
      if (!options.project) {
        process.nextTick(function() {
          callback("You did not specify a Lighthouse project");
        });
        return;
      }

      request({
        uri: endpoint(options.account, "/projects/" + options.project + "/milestones.json"),
        headers: {
          "X-LighthouseToken": options.token
        }
      }, function(err, res, body) {
        if (res.statusCode === 200) {
          try {
            var milestones = JSON.parse(body);
          } catch(e) {
            callback(e);
            return;
          }

          if (Array.isArray(milestones.nil_classes)) {
            milestones = [];
          } else {
            milestones = milestones.milestones.map(function(value) {
              return value.milestone;
            });
          }

          callback(null, milestones);
        } else {
          callback(body);
        }
      });
    }),

    // Projects
    listProjects: prep(defaults, function(options, callback) {
      request({
        uri: endpoint(options.account, "/projects.json"),
        headers: {
          "X-LighthouseToken": options.token
        }
      }, function(err, res, body) {
        if (res.statusCode === 200) {
          try {
            var projects = JSON.parse(body);
          } catch(e) {
            callback(e);
            return;
          }

          // If there are no projects listed
          if (Array.isArray(projects.nil_classes)) {
            projects = [];
          } else {
            projects = projects.projects.map(function(value) {
              return value.project;
            });
          }

          callback(null, projects);
        } else {
          callback(body);
        }
      });
    }),
    getProject: prep(defaults, function(options, callback) {
      if (!options.project) {
        process.nextTick(function() {
          callback("You did not specify a Lighthouse project");
        });
        return;
      }

      request({
        uri: endpoint(options.account, "/projects/" + options.project + ".json"),
        headers: {
          "X-LighthouseToken": options.token
        }
      }, function(err, res, body) {
        if (res.statusCode === 200) {
          try {
            var project = JSON.parse(body);
          } catch (ex) {
            return callback(ex);
          }

          callback(null, project.project);
        } else if (res.statusCode === 404) {
          callback();
        }
      });
    }),

    // Tickets
    getTicket: prep(defaults, function(options, callback) {
      if (!options.project) {
        process.nextTick(function() {
          callback("You did not specify a Lighthouse project");
        });
        return;
      }

      if (!options.ticket) {
        process.nextTick(function() {
          callback("You did not specify a ticket number");
        });
        return;
      }

      request({
        uri: endpoint(options.account, "/projects/" + options.project + "/tickets/" + options.ticket + ".json"),
        headers: {
          "X-LighthouseToken": options.token
        }
      }, function(err, res, body) {
        try {
          var ticket = JSON.parse(body).ticket;
        } catch (ex) {
          return callback(ex);
        }

        callback(err, ticket);
      });
    }),
    listTickets: prep(defaults, function(options, callback) {
      if (!options.project) {
        process.nextTick(function() {
          callback("You did not specify a Lighthouse project");
        });
        return;
      }

      request({
        uri: endpoint(options.account, "/projects/" + options.project + "/tickets.json"),
        headers: {
          "X-LighthouseToken": options.token
        },
        qs: {
          q: options.q,
          limit: options.limit,
          page: options.page
        }
      }, function(err, res, body) {
        if (res.statusCode === 200) {
          try {
            var tickets = JSON.parse(body);
          } catch (ex) {
            return callback(ex);
          }

          if (!tickets.tickets) {
            return callback(null, []);
          }

          tickets = tickets.tickets.map(function(value) {
            return value.ticket;
          });

          callback(err, tickets);
        }
      });
    }),

    // Users
    getProjectUsers: prep(defaults, function(options, callback) {
      if (!options.project) {
        process.nextTick(function() {
          callback("You did not specify a Lighthouse project");
        });
        return;
      }

      request({
        uri: endpoint(options.account, "/projects/" + options.project + "/memberships.json"),
        headers: {
          "X-LighthouseToken": options.token
        }
      }, function(err, res, body) {
        if (res.statusCode === 200) {
          try {
            var users = JSON.parse(body);
          } catch (ex) {
            return callback(ex);
          }

          users = users.memberships.map(function(value) {
            return value.membership;
          });

          callback(null, users);
        } else if (res.statusCode === 404) {
          callback();
        }
      });
    })
  }
}
