var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/hockey", function(req, res) {
    db.hockey.findAll({}).then(function(dbhockey) {
      res.json(dbhockey);
    });
  });

  // Create a new example
  app.post("/api/hockey", function(req, res) {
    db.hockey.create(req.body).then(function(dbhockey) {
      res.json(dbhockey);
    });
  });

  // Delete an example by id
  app.delete("/api/hockey/:id", function(req, res) {
    db.hockey.destroy({ where: { id: req.params.id } }).then(function(dbhockey) {
      res.json(dbhockey);
    });
  });
};