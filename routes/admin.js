var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. **************************************************************/

router.get('/users', function (req, res, next) {
    models.User.findAll({
        /*include: [ models.Workday ]*/
    }).then(function (users) {
        res.render('admin/users', {
            title: 'Users',
            user_attributes: models.User.attributes,
            users: users.map(function (user) {
                return user.dataValues;
            })
        });
    });
});

/* Add user to DB **************************************************************/

router.route('/users/add')

    .get( function (req, res, next) {
        res.render('admin/users_add', {
            title: 'Users',
            user_attributes: models.User.attributes
        });
    })

    .post( function (req, res, next) {
        var user = models.User.build(req.body).save();
        //console.log(user);
        res.json(req.body);
    });


module.exports = router;
