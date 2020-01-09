const mongoose = require('mongoose');
const User = mongoose.model('User');

// TODO: если данные читает админ, то статус отправлено меняется на статус просмотрено
const ReadData = (req, res) => {
	const Arr = req.body.Arr;
	if (req.session.role === 'admin') {
		User.find({Role: 'user'}, function(err, result) {
			if (err) throw err;
			let data = {};
			for (user in result) {
				data[result[user]._id] = result[user][Arr];
			}
			res.json(data);
		})
	} 
	else {
		User.find({ _id: req.session.userID }, function(err, result) {
			if (err) throw err;
			let data = {};
			for (user in result) {
				data[result[user]._id] = result[user][Arr];
			}
			res.json(data);
		})
	}
}

module.exports = { ReadData };