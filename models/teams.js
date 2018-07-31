//Model for Teams table
module.exports = function(sequelize, DataTypes) {
    var Teams = sequelize.define("Teams", {
        teamname: {
            type: DataTypes.STRING,
            validate:{
                len: [1,20],
            },
        },
        teamowner: {
            type: DataTypes.STRING,
            validate:{
                len: [1,20],
            },
        },
        player1: {
            type: DataTypes.STRING,
            defaultValue: null,
            validate:{
                len: [1],
            },
        },
        player2: {
            type: DataTypes.STRING,
            defaultValue: null,
            validate:{
                len: [1],
            },
        },
        player3: {
            type: DataTypes.STRING,
            defaultValue: null,
            validate:{
                len: [1],
            },
        },
        player4: {
            type: DataTypes.STRING,
            defaultValue: null,
            validate:{
                len: [1],
            },
        },
        player5: {
            type: DataTypes.STRING,
            defaultValue: null,
            validate:{
                len: [1],
            },
        },
        ranking: {
            type: INTEGER,
            defaultValue: null,
        },
        goals: {
            type: INTEGER,
            defaultValue: null,
        },
        assists: {
            type: INTEGER,
            defaultValue: null,
        },
        total_points: {
            type: INTEGER,
            defaultValue: null,
        },
    });
    return Teams;
};