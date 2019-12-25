const mongoose = require('mongoose');

const User = mongoose.model('User');

const UsersList = (req, res) => {
	// res.status(200).json({ response: req.body.role })
	var userMap = {};
	User.find({ Role: 'user' }, function(err, users) {
		if (err) throw err;
		users.forEach(function(user) {
			userMap[user._id] = user;
		});

	res.json({ response: userMap });
	});
}

module.exports = { UsersList };