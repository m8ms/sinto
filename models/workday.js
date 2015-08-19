"use strict";

module.exports = function(sequelize, DataTypes) {
  var Workday = sequelize.define("Workday", {
    day: { type: DataTypes.DATEONLY, allowNull: false },
    started_at: { type: DataTypes.DATE },
    finished_at: { type: DataTypes.DATE }
  }, {
    classMethods: {
      associate: function(models) {
        Workday.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Workday;
};