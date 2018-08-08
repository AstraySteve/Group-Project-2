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
        ranking: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        goals: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        assists: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        total_points: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        total_cost:{
            type: DataTypes.FLOAT,
            defaultValue: 0,
        }
    });
    return Teams;
};