'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};


fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    if (file.slice(-3) !== '.js') return;
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

/**
 *  Model common hooks
 */

sequelize.addHook('beforeValidate', function (model, options) {
  var modelName = model.__options.name.singular
  var attributes = db[modelName].attributes;

  for(var attr in attributes){
    if(attributes[attr].type == 'BOOLEAN'){
      if (model.dataValues[attr] === 'on'){
        model.dataValues[attr] = true; 
      }else{
        model.dataValues[attr] = false;
      }
    }
    if(attributes[attr].type == 'DATE'){
      //todo
    }
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
