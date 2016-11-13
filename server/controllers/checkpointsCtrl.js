var app = require('./../index');
var db = app.get('db');

module.exports = {

	// something //
	all_from_checkpoints: function(req, res, next) {
		//var checkpoints = req.body;

		db.all_from_checkpoints(/*[checkpoints.id, checkpoints.checkpoint_name, checkpoints.employee_id], */function(err, checkpoints) {

				res.status(200)
				.json(checkpoints);
		});
}
}
