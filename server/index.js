/* ========================
      EXTERNAL MODULES
   ======================== */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session');
const bcrypt = require('bcryptjs');
/* ========================
           CONFIG
   ======================== */
const config = require('./config');
/* ========================
          EXPRESS
   ======================== */
//initializing the app. invoking express
const app = module.exports = express();

//app.use uses whatever's in the parenthesis aka function on every request to the server
app.use(bodyParser.json()); //using the bodyParser.json() function on every request aka app.use
app.use(cors());
app.use(express.static(__dirname + './../public'));


/* ========================
           MASSIVE
   ======================== */
const massiveUri = config.MASSIVE_URI;
const massiveServer = massive.connectSync({
    connectionString: massiveUri
});

app.set('db', massiveServer); //these two lines let us pass database connection between files.
const db = app.get('db');

var dbSetup = require('./services/dbSetup');
dbSetup.run();
/* ========================
         CONTROLLERS
   ======================== */
//server-side controller
const checkinCtrl = require('./controllers/checkinCtrl'); //requires the controller on server side
const userCtrl = require('./controllers/userCtrl');
const checkpointsCtrl = require('./controllers/checkpointsCtrl');
const welcomeAssetsCtrl = require('./controllers/welcomeAssetsCtrl');
const findCtrl = require('./controllers/findCtrl');
/* ========================
          SERVICES
   ======================== */
const passport = require('./services/passport');

/* ========================
            POLICIES
   ======================== */
//isAuthed makes sure the user can't hit certain endpoints if theyre not logged in
const isAuthed = function(req, res, next) {
    if (!req.isAuthenticated()) return res.status(401)
        .send();
    return next();
};

const isAdmin = function(req, res, next) { //isAdmin middleware should allow access to admin only pages
    if (!req.isAuthenticated() || !req.user.admin) return res.status(401)
        .send();
    return next();
};

/* ========================
    SESSION AND PASSPORT
   ======================== */
app.use(session({
    secret: config.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

/* ========================
   PASSPORT AND ENDPOINTS
   ======================== */
app.post('/login', passport.authenticate('local', {
    successRedirect: '/home'
}));

app.get('/logout', function(req, res, next) {
    req.logout();
    return res.status(200)
        .send('logged out');
});


/* ========================
        USER ENDPOINTS
   ======================== */
//now what is my front end asking for?
//in otherwords, whatever requests the endpoint in angular is where the endpoint is responding to. where the data is being sent.
//first parameter is the URL aka endpoint, the second parameter are instructions on what to do next if someone hits the endopoint
//.send is only for a string, so we used .json
app.post('/checkin', checkinCtrl.checkin);
app.get(''); //making the find button

//controllers
app.post('/register', userCtrl.register);
app.get('/home', isAuthed, userCtrl.home);
app.get('/admin-home', isAuthed, userCtrl.home);
app.get('/edit', isAuthed, userCtrl.edit);
app.post('/addUser', isAuthed, userCtrl.admin_create_user);
app.get('/checkpoints', isAuthed, checkpointsCtrl.all_from_checkpoints);
app.get('/welcomeAssets', isAuthed, welcomeAssetsCtrl.welcome_assets);
app.post('/find', isAuthed, findCtrl.find_po);

/* ========================
         CONNECTIONS
   ======================== */

const port = config.PORT;
app.listen(port, function() {
    console.log("listening on", port);
});
