var app = require('../index')
var db = app.get('db');

module.exports = {
  checkin: function(req, res, next) {
    console.log(req.body);
    //var date = new Date();
    var date = new Date().format('Y/m/d H:i:s');
    console.log(Number(req.body.ponumber))
    db.checkin([date, Number(req.body.ponumber), req.body.checkpoint_id], function (err, response) {//gets from homeService.js
      console.log('err', err);
      console.log('resp', response);
      (err) ? res.send(err) : res.send('success!') // (err) ? is the if part, and : is the else part
    } )
  },

  test: function(req, res, next) {
    db.test(function(err, response) {
      res.status(200).json(response)
    })
  }






}
