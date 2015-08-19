var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/users', function (req, res, next) {
    models.User.findAll({
        /*include: [ models.Workday ]*/
    }).then(function (users) {
        res.render('admin/users', {
            title: 'Users',
            user_attributes: Object.keys(models.User.attributes),
            users: users.map(function (user) {
                return user.dataValues;
            })
        });
    });
});

/* Add user to DB */
router.post('/users/add', function (req, res, next) {
    res.send('that my response');
});


module.exports = router;
