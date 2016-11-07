var app = require('../index')
var db = app.get('db');

module.exports = {
  checkin: function(req, res, next) {
    var date = new Date();
    db.checkin([date, req.body.ponumber, req.body.checkpoint_id], function (err, response) {//gets from homeService.js
      (err) ? res.send(err) : res.send('success!') // (err) ? is the if part, and : is the else part
    } )
  },

  test: function(req, res, next) {
    db.test(function(err, response) {
      res.status(200).json(response)
    })
  }






}
