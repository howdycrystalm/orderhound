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
const app = require('./../index.js');
const db = app.get('db');
/* ========================
       VERIFY PASSWORD
   ======================== */
function verifyPassword(submitedPass, userPass) {
    return bcrypt.compareSync(submitedPass, userPass);
}
/* ========================
      RUN WHEN LOGGIN IN
   ======================== */
   passport.use(new LocalStrategy({
     usernameField: 'name',
     passwordField: 'password'
   }, function(name, password, done) {

     db.user_search_username([name], function(err, user) {
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

   // Puts the user on the session
   passport.serializeUser(function(user, done) {
     done(null, user.id);
   });
   passport.deserializeUser(function(id, done) {
     db.user_search_id([id], function(err, user) {
       db.run('SELECT id FROM checkpoints WHERE employee_id = $1', [user[0].id], function (err, checkpoint) { //in-line sql
         if(checkpoint.length > 0) {
           user[0].checkpoint_id = checkpoint[0].id;
         }
         console.log(err, user);
         done(err, user[0]);
       })
     });
   });

   module.exports = passport;
