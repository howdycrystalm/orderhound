// APP //
var app = require('./../index');
var db = app.get('db');

// BCRYPT
var bcrypt = require('bcryptjs');

// HASH PASSWORD //
function hashPassword(password) {

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    return hash;
}

module.exports = {

    // REGISTER USER //
    register: function(req, res, next) {
        var user = req.body;


        // Hash the users password for security
        user.password = hashPassword(user.password);
        db.admin_create([user.name, user.email, user.password, user.photo, true], function(err, user) {
            //db.user_create([user.name, user.email, user.password, true], function(err, user) {
            // If err, send err

            user = user;

            if (err) {

                return res.status(500).send(err);
            } else if (req.body.checkPoint) {
                db.checkpoint_create([req.body.checkPoint, user.id])
            }

            // Send user back without password.
            delete user.password;

            res.status(200)
                .send(user);
        });
    },
    admin_create_user: function(req, res, next) {
        var user = req.body;


        // Hash the users password for security
        user.password = hashPassword(user.password);
        db.admin_user_create([user.name, user.admin, user.photo, user.password], function(err, userProcessed) {
            //db.user_create([user.name, user.email, user.password, true], function(err, user) {
            // If err, send err

            if (err) {

                return res.status(500).send(err);
            }

            userProcessed = userProcessed[0];

            if (req.body.checkPoint) {
                var x = [req.body.checkPoint, userProcessed.id]

                db.checkpoint_create(x, function(err, response) {

                })
            }

            // Send user back without password.
            delete user.password;

            res.status(200)
                .send(userProcessed);
        });
    },

    home: function(req, res, next) {
        // If user isnt on the session, then return error status
        if (!req.user) return res.status(401)
            .send('current user not defined');

        // Remove password for security
        var user = req.user;


        delete user.password; //this blocks password from showing on front end

        // Return user
        return res.status(200)
            .json(user);
    },
    //DO I NEED READ???????????????????????????????
    read: function(req, res, next) {
        var searchOptions = {
            columns: ['id', 'name', 'email']
        };

        db.users.find(req.query, searchOptions, function(err, users) {
            if (err) {
                console.log('User read error: ', err);
                return res.status(401)
                    .send(err);
            }

            res.status(200)
                .send(users);
        })
    },

// RETURN CURRENT USER //
edit: function(req, res, next) {
        // If user isnt on the session, then return error status
        if (!req.user) return res.status(401)
            .send('current user not defined');

        // Remove password for security
        var user = req.user;


        delete user.password;

        // Return user
        return res.status(200)
            .json(user);
    },
    //DO I NEED UPDATE????????????????????????????????
    update: function(req, res, next) {
        User.findByIdAndUpdate(req.params._id, req.body, function(err, result) {
            if (err) next(err);
            res.status(200)
                .send('user updated');
        });
    }
};
