var app = require('../index')
var db = app.get('db');


module.exports = {
  checkin: function(req, res, next) {

    var date = new Date(); //format when have time
    console.log(Number(req.body.ponumber))
    db.create_po([date, Number(req.body.ponumber), req.user.id, req.user.checkpoint_id], function (err, response) {//gets from homeService.js

      // db.doespoexist([Number(req.body.ponumber)], function (err, response) {//gets from homeService.js
      //   //if it exists, update base on parameters
      //   //else if it doesn't exist, create it
      //
      //   if(response[0].ponumber) {
      //
      //   }
      //   if(err) {
      //     res.json(err)
      //   }
      //   res.status(200).json(response)//this talks to the front end, and the front end then decides what to show the client
      // })

console.log(err);
      (err) ? res.send(err) : res.send('success!') // (err) ? is the if part, and : is the else part
    })
}



};
