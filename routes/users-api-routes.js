// Requiring our models
var db = require("../models");

// Routes
// ============================================================
module.exports = function(app) {
    //Get route for retrieving all usernames
    //Note: for use in checking for unique usernames
    app.get('/api/users', function(req,res){
        db.Users.findAll({
            attributes:["username"],
        }).then(function(userData){
            res.json(userData);
        });
    });
    
    //Get route for retrieving a single user info using the username as lookup
    //TODO: figure out how to keep passwords safe during checking
    app.get('/api/users/:username', function(req,res) {
        db.Users.findOne({
            where: {
                username: req.params.username,
            },
        }).then(function(userData){
            res.json(userData);
        });
    });

    //Creates new data
    app.post('/api/users', function(req, res){
        var hashWord = req.body.password //TODO: Password Hash operation done here
        var newUser = {
            username: req.body.name,
            password: hashWord,
        }
        db.Users.create(newUser).then(function(data){
            res.json(userData);
        });
    });

    //Delete user with user id userid
    app.delete('/api/users/:userid', function(req,res) {
        db.Users.destroy({
            where: {
                username: req.params.userid,
            },
        }).then(function(data) {
            //will send back either a 1 (true) or 0 (false)
            res.json(data);
        });
    });
};