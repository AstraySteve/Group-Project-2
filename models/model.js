

module.exports = function(sequelize, DataTypes) {
    var hockey = sequelize.define("hockey", {
        player_name: DataTypes.STRING,
        cap: DataTypes.INTEGER,
        goals: DataTypes.INTEGER,
        assists: DataTypes.INTEGER,
        total_points: DataTypes.INTEGER
    });

    return hockey;
}
