var client = require("./lib/client");

module.exports = {
  createClient: function(defaults) {
    return client(defaults);
  }
};
