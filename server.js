require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

var passport   = require('passport');
var session    = require('express-session');
var flash = require("connect-flash");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;
// var port = 3307;

// Middleware
// For BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
// For Passport
app.use(session({ secret: 'secret',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/users-api-routes")(app);
require("./routes/teams-api-routes")(app);
require("./routes/players-api-routes")(app);
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app, passport);

//load passport strategies
require('./config/passport.js')(passport, db.Users);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> Listening on port %s. Visit http://localhost:3000/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
