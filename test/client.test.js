var specify = require("specify"),
    nock = require("nock");

var mock = {
  account: "node-lighthouse-client",
  token: "5836fe149e475c7d8849d4315aef720d7523590c"
};

var fake = {
  account: "test",
  token: "test"
};

specify("external api", function(assert) {
  var lighthouse = require("../index");
  assert.ok(lighthouse, "Should exist");
  assert.equal(typeof lighthouse.createClient, "function", "Should have createClient function");

  var client = lighthouse.createClient();
  assert.ok(client, "Should exist");
  assert.deepEqual(client.defaults, {}, "Should be defaulted to {}");

  [
    "listProjects"
  ].forEach(function(value) {
    assert.equal(typeof client[value], "function", "Should have " + value + " function");
  });

});

specify("listProjects", function(assert) {
  var client = require("../index").createClient();

  client.listProjects(function(err, data) {
    assert.equal(err, "You did not specify a Lighthouse account", "Must specify account");
    assert.equal(data, undefined, "No data returned");
  });

  client.listProjects({
    account: fake.account
  }, function(err, data) {
    assert.equal(err, "You did not specify a Lighthouse token", "Must specify token");
    assert.equal(data, undefined, "No data returned");
  });

  var invalidToken = nock("https://" + mock.account + ".lighthouseapp.com")
    .matchHeader("X-LighthouseToken", fake.token)
    .get("/projects.json")
    .replyWithFile(401, __dirname + "/replies/listProjects-invalidToken.txt");

  client.listProjects({
    account: mock.account,
    token: fake.token
  }, function(err, data) {
    assert.equal(err, "Couldn't authenticate you: Invalid API Token for this project.", "Invalid token error");
    assert.equal(data, undefined, "Data returned");
    assert.ok(invalidToken.isDone(), "Mock didn't run");
  });

  var none = nock("https://" + mock.account + ".lighthouseapp.com")
    .matchHeader("X-LighthouseToken", mock.token)
    .get("/projects.json")
    .replyWithFile(200, __dirname + "/replies/listProjects-none.json");

  client.listProjects(mock, function(err, data) {
    assert.equal(err, undefined, "Error returned");
    assert.deepEqual(data, [], "Projects in list");
    assert.ok(none.isDone(), "Mock didn't run");
  });

  var oneProject = nock("https://" + mock.account + ".lighthouseapp.com")
    .matchHeader("X-LighthouseToken", mock.token)
    .get("/projects.json")
    .replyWithFile(200, __dirname + "/replies/listProjects-one.json");

  client.listProjects(mock, function(err, data) {
    assert.equal(err, undefined, "Error returned");
    assert.ok(Array.isArray(data), "Data isn't an array");
    assert.equal(data.length, 1, "Should be one project in array");
    assert.ok(oneProject.isDone(), "Mock didn't run");
  });
});

specify.run();