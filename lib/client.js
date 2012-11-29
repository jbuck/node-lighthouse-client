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
    })
  }
}
