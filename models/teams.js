//Model for Teams table
module.exports = function(sequelize, DataTypes) {
    var Teams = sequelize.define("Teams", {
        teamname: {
            type: DataTypes.STRING,
            validate:{
                len: [1,20],
            },
        }
        //TODO add more attributes/ columns
    });
    return Teams;
};