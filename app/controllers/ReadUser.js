const mongoose = require('mongoose');
const User = mongoose.model('User');

const UsersList = (req, res) => {
	if (req.session.role === 'admin') {
		var userMap = {};
		
		User.find({ Role: 'user' }, function(err, users) {
			if (err) throw err;
			users.forEach(function(user) {
				userMap[user._id] = user;
			});

			res.json({ response: userMap });
		});
	}
}

const OneUser = (req, res) => {
	if (req.session.role === 'admin') {
		User.findById(req.body.id, function(err, result) {
			if (err) throw err;
			var obj = result.toObject();
			Object.keys(obj).forEach(function(key) {
				if (typeof obj[key] === 'object') {
					delete obj[key];
				}
			});
			delete obj.Password;
			delete obj.__v;
			delete obj.Role;

			res.status(200).json({response: obj});
		})
	} else {
		res.status(403).json({ response: "Тебе сюда нельзя" });
	}
}

module.exports = { UsersList, OneUser };