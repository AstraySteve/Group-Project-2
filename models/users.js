//model for user table
module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        teamname: {
            type: DataTypes.STRING,
            defaultValue: null,
            validate:{
                len: [1,20],
            }
        }
    });
    return Users;
};
