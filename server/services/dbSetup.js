var app = require('./../index');
var db = app.get('db');

module.exports = {
    run: function () {
      console.log('Initializing database');

      db.user_table_initialize(function(err, table) {})
    }
};
