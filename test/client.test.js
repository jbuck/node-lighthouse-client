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
});

specify("listProjects", function(assert) {
  var client = require("../index").createClient();

  var none = nock("https://" + mock.account + ".lighthouseapp.com")
    .matchHeader("X-LighthouseToken", mock.token)
    .get("/projects.json")
    .reply(200, {"nil_classes":[]});

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

specify("getProject", function(assert) {
  var client = require("../index").createClient(mock);

  client.getProject(function(err, data) {
    assert.equal(err, "You did not specify a Lighthouse project", "Must specify project");
    assert.equal(data, undefined, "Data should not be returned");
  });

  var scope = nock("https://" + mock.account + ".lighthouseapp.com")
    .matchHeader("X-LighthouseToken", mock.token)
    .get("/projects/102935.json")
    .replyWithFile(200, __dirname + "/replies/getProject-one.json")
    .get("/projects/10293.json")
    .reply(404);

  client.getProject({
    project: "102935"
  }, function(err, data) {
    assert.equal(err, undefined, "Error returned");
    assert.ok(data, "Data be returned");
    assert.equal(typeof data, "object", "Data wasn't an object");
  });

  client.getProject({
    project: "10293"
  }, function(err, data) {
    assert.equal(err, undefined, "Error returned");
    assert.equal(data, undefined, "Data returned");
  });
});

specify.run();
