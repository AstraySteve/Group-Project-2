var db = require("../models");

module.exports = function(app) {
  // Get all players
  app.get("/api/hockey", function(req, res) {
    db.player_info.findAll({}).then(function(dbhockey) {
      res.json(dbhockey);
    });
  });

  /*
  //update players teams by teamname
  app.put("/api/hockey/:teamname", function(req, res) {
    db.player_info.update(
      req.body,
      {
        where: {
          belongTo: req.params.teamname,
        }
      }
    ).then(function(dbhockey){
      res.json(dbhockey);
    });
  });*/

  //update boolean isDrafted by id
  app.put("/api/hockey/:id", function(req,res) {
    db.player_info.update(
      req.body,
      {
        where: {
          id: req.params.id,
        }
      }
    ).then(function(dbhockey) {
      res.json(dbhockey);
    });
  });

  //These are for admin control
  /*
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
  */
};