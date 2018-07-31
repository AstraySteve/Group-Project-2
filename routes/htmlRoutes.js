var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  //TODO: add links to other pages
  app.get("/lobby", function(req, res) {
    db.Teams.findAll({}).then(function(teamData) {
      //TODO: handle teamData to be passed to lobby page
      //res.render("lobby", {handlebars variable hookups})
      res.render("lobby"); //TEMP CODE REMOVE WHEN DONE
    });
  });

  app.get("/login", function(req,res) {
    //TODO: link to login page
    res.render("login"); //Temp code,To modify
  });

  app.get("/profile/:userid", function(req,res) {
    //TODO: link to user profile page
    var userID = req.params.userid;
    res.render("profilePage", {userName: userID});
  });

  //NOTES: might need create user page, create team page, compare team page
  
  //TEST CODE REMOVE WHEN DONE
  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  //CATCH ALL CODE
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
