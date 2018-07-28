var db = require("../models");

module.exports = function(app) {
  // Get all players
  app.get("/api/hockey", function(req, res) {
    db.player_info.findAll({}).then(function(dbhockey) {
      res.json(dbhockey);
    });
  });

  //TODO: these are for admin control
  //Post a player to list
  app.post("/api/hockey", function(req, res) {
    db.player_info.create(req.body).then(function(dbhockey) {
      res.json(dbhockey);
    });
  });

  // Delete player from list by id
  app.delete("/api/hockey/:id", function(req, res) {
    db.player_info.destroy({ where: { id: req.params.id } }).then(function(dbhockey) {
      res.json(dbhockey);
    });
  });
};