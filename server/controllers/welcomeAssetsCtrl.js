var app = require('./../index');
var db = app.get('db');

module.exports = {
	// grabs employee_name, photo, checkpoint_name for the welcome message in home view from databse //
	welcome_assets: function(req, res, next) { //name of table in database, also is the url name from index.js
		db.welcome_assets(/*[checkpoints.id, checkpoints.checkpoint_name, checkpoints.employee_id], */function(err, response) {
				res.status(200)
				.json(response);//I THINK second paramater in the above function, in this case 'response', must match paramter in .json
		});
}
}

//trying out new code below
// module.exports = {
// 	// grabs employee_name, photo, checkpoint_name for the welcome message in home view from databse //
// 	welcome_assets: function(req, res, next) { //name of table in database, also is the url name from index.js
// 		db.welcome_assets(/*[checkpoints.id, checkpoints.checkpoint_name, checkpoints.employee_id], */function(err, response) {
// 				res.status(200)
// 				.json(response);//I THINK second paramater in the above function, in this case 'response', must match paramter in .json
// 		});
// }
// };
