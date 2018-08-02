module.exports = function(sequelize, DataTypes) {
    var player_info = sequelize.define("player_info", {
        player_name: DataTypes.STRING,
        cap: DataTypes.INTEGER,
        goals: DataTypes.INTEGER,
        assists: DataTypes.INTEGER,
        total_points: DataTypes.INTEGER,
        isDrafted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, 
        }
    },{
        freezeTableName: true
    });

    return player_info;
}
