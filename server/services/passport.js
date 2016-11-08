/* ========================
      PASSPORT MODULES
   ======================== */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

/* ========================
          BCRYPT
   ======================== */
const bcrypt = require('bcryptjs');

/* ========================
            APP
   ======================== */

/* ========================
       VERIFY PASSWORD
   ======================== */

/* ========================
      RUN WHEN LOGGIN IN
   ======================== */
   passport.use(new LocalStrategy({
   	usernameField: 'username',
   	passwordField: 'password'
  }, function(username, password, done) {

   	db.user_search_username([username], function(err, user) {
   		user = user[0];

   		// If err, return err
   		if (err) done(err);

   		// If no user if found, return false
   		if (!user) return done(null, false);

   		// If user is found, check to see if passwords match. If so, return user
   		if (verifyPassword(password, user.password)) return done(null, user);

   		// If no match, return false
   		return done(null, false);
   	});
   }));
