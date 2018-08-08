var db = require("../models");

module.exports = function(app, passport) {
  // Load index/ title page
  app.get("/", function(req, res) {
    res.render("index", {
      cssLibrary: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.css',
      customCss: '/styles/stylesTitle.css'
    });
  });
  
  app.get("/lobby", function(req, res) {
    db.Teams.findAll({}).then(function(teamData) {
      res.render("lobby", {
        cssLibrary:'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css',
        customCss: '/styles/styles.css',
        teamData: teamData
      });
    });
  });

  //LOGIN
  app.get("/signup", function(req, res) {
    //link to signup page
    res.render("signup",{
      cssLibrary: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css',
      customCss: '/styles/styles.css'
    });
  });
  app.get("/signin", function(req,res) {
    //link to signin
    res.render("signin",{
      cssLibrary: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css',
      customCss: '/styles/styles.css',
    });
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

  //Profile Page
  app.get("/profile/:userid", isLoggedIn, function(req,res) {
    var userID = req.params.userid;
    db.Teams.findOne({
      where:{teamowner: userID},
    }).then(function(data){
      if(data!=null){
        //if there is a team found with this username
        var teamStat = data;
        //find all players belonging to this team
        db.player_info.findAll({
          where: {belongTo: data.teamname},
        }).then(function(data){
          var teamName = data[0].belongTo;
          res.render("profilePage", {
            cssLibrary: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css',
            customCss: '/styles/stylesProfile.css',
            userName: userID,
            teamName: teamStat.teamname, 
            playerList: data,
            teamRanking: teamStat.ranking,
            teamGoals: teamStat.goals,
            teamAssists: teamStat.assists,
            teamTotal: teamStat.total_points,
            teamCost: teamStat.total_cost
          })
        })
      }
      else{
        //render this if there is no team associated to user
        res.render("profilePage",{
          cssLibrary: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css',
          customCss: '/styles/stylesProfile.css',
          userName: userID,
          teamName: "Team not created"
        })
      }
    });
  });
  
  //helper function to get players not assigned to team
  getAvaliablePlayers =(playerList, team)=>{
    var allPlayers = [];
    var players = [];
    var teamPlayers = [];
    for(var i=0; i<playerList.length; i++){
      if(playerList[i].isDrafted == false){
        players.push(playerList[i]);
      }
      else if(playerList[i].belongTo == team){
        teamPlayers.push(playerList[i]);
      }
    }
    allPlayers.push(players);
    allPlayers.push(teamPlayers);
    return allPlayers;
  }

  //Team Create/Edit/Manage Page
  app.get("/teamcreate/:userID", function(req,res){
    var userID = req.params.userID;
    db.Teams.findOne({
      where:{teamowner: userID},
    }).then(function(teamData){
      if(teamData!=null){
        var teamStat = teamData;
      }
      else{
        teamStat = {
          /*ranking: "N/A",*/
          goals: 0,
          assists: 0,
          total_points:0,
          total_cost: 0,
        }
      }
      db.player_info.findAll({}).then(function(playerList) {
        var avaliablePlayers = getAvaliablePlayers(playerList, teamStat.teamname);
        res.render("teamCreate", {
          cssLibrary: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css',
          customCss: '/styles/stylesProfile.css',
          userName: userID,
          team: teamStat,
          teamPlayers: avaliablePlayers[1],
          playerList: avaliablePlayers[0]
        })
      });
    });
  });

  //CATCH ALL CODE
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404", {
        cssLibrary: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css',
        customCss: '/styles/styles.css'
    });
  });

  //Check if user is logged in
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/signin');
  }
};
