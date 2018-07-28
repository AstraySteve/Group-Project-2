// Requiring our models
var db = require("../models");

// Routes
// ============================================================
module.exports = function(app) {
    //Get route for retrieving all data
    app.get('/api/teams', function(req, res) {
        db.Teams.findAll({}).then(function(teamData) {
            //TODO: join tables here as needed
            res.json(teamData);
        });
    });

    //Post route for creating team and adding to the db
    app.post('/api/teams', function(req, res) {
        db.Teams.create(req.body).then(function(teamData) {
            //TODO: adjust req.body as needed
            res.json(teamData);
        });
    });

    //Delete route for removing team from database
    app.delete('/api/teams/:teamName', function(req, res) {
        db.Teams.destroy({
            where: {
                teamname: req.params.teamName,
            },
        }).then(function(data) {
            //TODO:maybe return a true or false statement to confirm deletion
            res.json(data);
        });
    });

    //Put route for updating team players or team name
    app.put('/api/teams/:teamName', function(req, res) {
        db.Teams.update(
            req.body,
            {
                where: {
                    teamname: req.params.teamName,
                },
            }).then(function(tableData) {
                //TODO: ensure that this is what you wanted to be returned
                res.json(tableData);
        })
    });
};