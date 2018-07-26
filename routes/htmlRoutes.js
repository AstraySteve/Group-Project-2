var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    //TODO: change to fit homepage/loby as needed
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  //TODO: add links to other pages
  app.get("/login", function(req,res) {
    //TODO: link to login page
  });

  app.get("/profile/:userid", function(req,res) {
    //TODO: link to user profile page
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
