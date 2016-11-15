var app = require('../index')
var db = app.get('db');

module.exports = {
  find: function(req, res, next) {

    var date = new Date(); //format when have time
    console.log(Number(req.body.testing))
    db.find([date, Number(req.body.testing)], function (err, response) {
      console.log(err);
            (err) ? res.send(err) : res.send('success!') // (err) ? is the if part, and : is the else part
          })
      }

      };
