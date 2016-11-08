/* ========================
      EXTERNAL MODULES
   ======================== */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session');

/* ========================
           CONFIG
   ======================== */
const config = require('./services/config.js');
/* ========================
          EXPRESS
   ======================== */
//inistializing the app. invoking express
const app = module.exports = express();

//app.use uses whatever's in the parenthesis aka function on every request to the server
app.use(bodyParser.json());//using the bodyParser.json() function on every request aka app.use
app.use(cors());
app.use(express.static(__dirname + './../public'));


/* ========================
           MASSIVE
   ======================== */
const massiveServer = massive.connectSync({ //massiveServer is the variable that represents connection to our server
  connectionString: 'postgres://localhost/orderhound' //orderhound is the database
})

app.set('db', massiveServer); //these two lines let us pass database connection between files.
const db = app.get('db');


/* ========================
         CONTROLLERS
   ======================== */
//server-side controller
const checkinCtrl = require('./controllers/checkinCtrl') //require the controller on server side

/* ========================
          SERVICES
   ======================== */
const passport = require('./services/passport');

/* ========================
            POLICIES
   ======================== */


 /* ========================
     SESSION AND PASSPORT
    ======================== */


/* ========================
   PASSPORT AND ENDPOINTS
   ======================== */


/* ========================
        USER ENDPOINTS
   ======================== */
//now what is my front end asking for?
//in otherwords, whatever requests the endpoint in angular is where the endpoint is responding to. where the data is being sent.
//first parameter is the URL aka endpoint, the second parameter are instructions on what to do next if someone hits the endopoint
//.send is only for a string, so we used .json
app.post('/checkin', checkinCtrl.checkin);
app.get('');//making the find button

/* ========================
         CONNECTIONS
   ======================== */

const port = 8080;
app.listen(port, function () {
  console.log('listening on', port);
})
