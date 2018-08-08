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
      //console.log("TEAM DATA " + JSON.stringify(teamData));
      res.render("lobby", {teamName: teamData}); //TEMP CODE REMOVE WHEN DONE
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
      //successRedirect: '/profile',
      failureRedirect: '/signup',
      failureFlash: true, 
    }),function(req,res){
      //console.log("THIS HERE!" + JSON.stringify(req.body));
      res.redirect('/profile/' + req.body.username);
    }
  );
  app.post('/signin', passport.authenticate('local-signin',
    {
      failureRedirect: '/signin',
      failureFlash: true,
    }),function(req, res){
      //console.log("THIS HERE!" + JSON.stringify(req.body));
      res.redirect('/profile/' + req.body.username); 
    }
  );

  app.get("/profile/:userid", isLoggedIn, function(req,res) {
    //link to user profile page
    var userID = req.params.userid;
    db.Teams.findOne({
      where:{teamowner: userID},
    }).then(function(data){
      //TODO: handle data to be displayed for team stats
      //if null return blank, else return team data
      var teamName = "";
      var playerList = [];
      if (data!=null){
        teamName = data.teamname;
        playerList = [data.player1, data.player2, data.player3, data.player4, data.player5];
      }
      res.render("profilePage", {userName: userID, teamName: teamName, playerList: playerList});
    });
  });
  
  //Samy's adds for the team create page
  app.get("/teamCreate", function(req, res) {
    db.player_info.findAll({}).then(function(playerList) {
      res.render("teamCreate", {playerList});
    });
  });


  app.put('/teamCreate/update', function(req, res){
    db.player_info.update(req.body.player_info_id, function(result){
        console.log(result);
        response.redirect('/');
    })
  });

  
  app.get("/teamCreate", function(req, res) {
    db.teams.findAll({}).then(function(teamList) {
      res.render("teamCreate", {teamList});
    });
  });


  app.put('/teamCreate/update', function(req, res){
    db.teams.update(req.body.player_info_id, function(result){
        console.log(result);
        response.redirect('/');
    })
  });
  //End of Samy's adds for the team create page

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
