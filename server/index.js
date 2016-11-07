//require modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');


const massiveServer = massive.connectSync({ //massiveServer is the variable that represents connection to our server
  connectionString: 'postgres://localhost/orderhound' //localhost is the server name, postgress is my db name;
})

//inistializing the app. invoking express
const app = module.exports = express();

//app.use uses whatever's in the parenthesis aka function on every request to the server
app.use(bodyParser.json());//using the bodyParser.json() function on every request aka app.use
app.use(cors());
app.use(express.static(__dirname + './../public'));

app.set('db', massiveServer); //these two lines let us pass database connection between files.
const db = app.get('db');



const checkinCtrl = require('./controllers/checkinCtrl') //require the controller on server side

//endpoints
//now what is my front end asking for?
//in otherwords, whatever requests the endpoint in angular is where the endpoint is responding to. where the data is being sent.
//first parameter is the URL aka endpoint, the second parameter are instructions on what to do next if someone hits the endopoint
//.send is only for a string, so we used .json
app.post('/checkin', checkinCtrl.checkin);
app.get('/checkin', checkinCtrl.test);

const port = 8080;
app.listen(port, function () {
  console.log('listening on', port);
})
