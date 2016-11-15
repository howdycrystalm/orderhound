var app = require('../index')
var db = app.get('db');

module.exports = {
  find_po: function(req, res, next) { //find_po matches endpoint name in index.js

    var date = new Date(); //format when have time
    console.log('PO NUMBER HERE!!! ', req.body)
    db.find_po([date, req.body.ponumber], function (err, response) {
      console.log(err);
      (err) ? res.send(err) : res.send('success!') // (err) ? is the if part, and : is the else part
    })
  }

};
