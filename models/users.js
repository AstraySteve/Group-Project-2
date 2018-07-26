//model for user table
module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("users", {
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
        }
    });
    return Users;
};
