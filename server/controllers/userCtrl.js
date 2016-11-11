// APP //
var app = require('./../index');
var db = app.get('db');

// BCRYPT
var bcrypt = require('bcryptjs');

// HASH PASSWORD //
function hashPassword(password) {
	console.log("PREHASH PASSWORD: ", password);
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(password, salt);
	console.log("HASHED PASSWORD: ", hash);
	return hash;
}

module.exports = {

	// REGISTER USER //
	register: function(req, res, next) {
		var user = req.body;
		console.log("BACKEND REGISTER: ", user);

		// Hash the users password for security
		user.password = hashPassword(user.password);
		db.admin_create([user.name, user.email, user.password, true], function(err, user) {
		//db.user_create([user.name, user.email, user.password, true], function(err, user) {
			// If err, send err
			if (err) {
				console.log("error: ", err);
				return res.status(500).send(err);
			}
			// Send user back without password.
			delete user.password;
			console.log("USER DB ENTRY SUCCESSFUL.");
			res.status(200)
				.send(user);
		});
	},
	// registerAdmin: function(req, res, next) {
	// 	var user = req.body;
	//
	// 	// Hash the users password for security
	// 	user.password = hashPassword(user.password);
	// 	user.isAdmin = true;
	//
	// 	db.admin_create([user.name, user.password, user.isAdmin], function(err, user) {
	// 		// If err, send err
	// 		if (err) return res.status(500)
	// 			.send(err);
	//
	// 		// Send user back without password.
	// 		delete user.password;
	// 		res.status(200)
	// 			.send(user);
	// 	});
	// },
	home: function(req, res, next) {
	// If user isnt on the session, then return error status
	if (!req.user) return res.status(401)
		.send('current user not defined');

	// Remove password for security
	var user = req.user[0];
	console.log("USER OBJECT: ",user);

	delete user.password;

	// Return user
	return res.status(200)
		.json(user);
},
//DO I NEED READ???????????????????????????????
	read: function(req, res, next) {
	User.find(req.query, function(err, result) {
		if (err) return res.status(500)
			.send(err);
		for (var i = 0; i < result.length; i++) {
			delete result[i].password;
		}
		res.status(200)
			.send(result);
	});
},

	// RETURN CURRENT USER //
	me: function(req, res, next) {
		// If user isnt on the session, then return error status
		if (!req.user) return res.status(401)
			.send('current user not defined');

		// Remove password for security
		var user = req.user[0];
		console.log(user);

		delete user.password;

		// Return user
		return res.status(200)
			.json(user);
	},
//DO I NEED UPDATE????????????????????????????????
	update: function(req, res, next) {
		User.findByIdAndUpdate(req.params._id, req.body, function(err, result) {
			if (err) next(err);
			res.status(200)
				.send('user updated');
		});
	}
};
