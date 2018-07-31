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
            res.json(teamData); //currently returns a json of the posted data
        });
    });

    //Delete route for removing team from database
    app.delete('/api/teams/:teamname', function(req, res) {
        db.Teams.destroy({
            where: {
                teamname: req.params.teamname,
            },
        }).then(function(data) {
            //will send back either a 1 (true) or 0 (false)
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
                //will send back either a 1 (true) or 0 (false)
                res.json(tableData);
        })
    });
};