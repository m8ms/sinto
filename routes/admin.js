var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. **************************************************************/

router.get('/users', function (req, res, next) {
    models.User.findAll({
        /*include: [ models.Workday ]*/
    }).then(function (users) {
        console.log(res.session)
        res.render('admin/users', {
            title: 'Users',
            user_attributes: models.User.attributes,
            message: req.flash('message'),
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
        var user = models.User.build(req.body)
            .save()
            .then(function(){
                req.flash('message', 'Successfuly saved user.');
                res.redirect('/admin/users');
            }).catch(function(err){
                console.error(err.errors);
                //console.log(user.error);
                for(var i in err){
                        console.log(i);
                    if(typeof err[i] == 'function')
                        console.log(i);
                }
                res.render('admin/users_add', {
                    title: 'Users',
                    message: 'Save failed: ' + err.message,
                    user_attributes: models.User.attributes,
                    instance_values: user._boundTo.dataValues
                }); 
            });
    });


module.exports = router;
