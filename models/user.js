"use strict";

var Sequelize = require('sequelize');


module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        first_name: {
            type: Sequelize.TEXT, 
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        last_name: {
            type: Sequelize.TEXT, 
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: Sequelize.STRING, 
            unique: true, 
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true     
            }
        },
        passwd: {
            type: Sequelize.TEXT,
            min: 8
        },
        passwd_salt: {
            type: Sequelize.TEXT,
            min: 8
        },
        employed_since: {
            type: Sequelize.DATEONLY, 
            allowNull: false
        },
        employed_until: {
            type: Sequelize.DATEONLY, 
            allowNull: false
        },

        is_admin: {
            type: Sequelize.BOOLEAN, 
            defaultValue: false
        },
        is_employee: {
            type: Sequelize.BOOLEAN, 
            defaultValue: true
        },
        is_active: {
            type: Sequelize.BOOLEAN, 
            defaultValue: false
        }
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
        }
    });

    return User;
};