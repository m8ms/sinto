"use strict";

var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        first_name: {type: DataTypes.TEXT, allowNull: false},
        last_name: {type: DataTypes.TEXT, allowNull: false},
        email: {type: DataTypes.STRING, unique: true, allowNull: false},
        password: DataTypes.TEXT,
        password_salt: DataTypes.TEXT,

        employed_since: {type: DataTypes.DATEONLY, allowNull: false, defaultValue: Sequelize.NOW},
        employed_until: {type: DataTypes.DATEONLY, allowNull: false, defaultValue: Sequelize.NOW},

        is_admin: {type: DataTypes.BOOLEAN, defaultValue: false},
        is_employee: {type: DataTypes.BOOLEAN, defaultValue: true},
        is_active: {type: DataTypes.BOOLEAN, defaultValue: false}
    }, {
        indexes: [
            // Create a unique index on email
            {
                unique: true,
                fields: ['email']
            }
        ],
        classMethods: {
            associate: function (models) {
                User.hasMany(models.Workday)
            }
        },
        hooks: {
            beforeValidate: function(user, options){
                console.log(user)
                for(var field in this.attributes){
                    console.log(field, this.attributes[field].type)
                }
            }
        }
    });

    return User;
};