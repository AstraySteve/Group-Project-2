var db = require("../models");

module.exports = function(app, passport) {
  // Load index/ title page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/lobby", function(req, res) {
    db.Teams.findAll({}).then(function(teamData) {
      //TODO: handle teamData to be passed to lobby page
      //res.render("lobby", {handlebars variable hookups})
      res.render("lobby"); //TEMP CODE REMOVE WHEN DONE
    });
  });

  //LOGIN
  app.get("/signup", function(req, res) {
    //link to signup page
    res.render("signup");
  });
  app.get("/signin", function(req,res) {
    //link to signin
    res.render("signin");
  });
  app.get("/logout", function(req, res) {
    //logout routine, redirects to lobby
    req.session.destroy(function(err) {
      res.redirect('/lobby');
    });
  });

  //Login redirects
  app.post('/signup', passport.authenticate('local-signup', 
    {
      //successRedirect: '/profile', //TODO fix url to account for different users
      failureRedirect: '/signup',
      //failureFlash: true, 
    }),function(req,res){
      res.redirect('/profile/' + req.body.email);
    }
  );
  app.post('/signin', passport.authenticate('local-signin',
    {
      failureRedirect: '/signin',
      //failureFlash: true,
    }),function(req, res){
      //console.log("THIS HERE!" + JSON.stringify(req.body));
      res.redirect('/profile/' + req.body.email); 
    }
  );


  //TODO: Figure out how to get userid in the redirects
  app.get("/profile/:userid", isLoggedIn, function(req,res) {
    //link to user profile page
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

  //Check if user is logged in
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/signin');
  }
};
