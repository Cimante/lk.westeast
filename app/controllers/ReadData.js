const mongoose = require('mongoose');
const User = mongoose.model('User');

// TODO: если данные читает админ, то статус отправлено меняется на статус просмотрено
const ReadData = (req, res) => {
	const Arr = req.body.Arr;
	if (req.session.role === 'admin') {
		User.find({Role: 'user'}, function (err, result) {
			if (err) throw err;
			let data = [];
			for (user in result) {
				for (let item in result[user][Arr]) {
					data.push(result[user][Arr][item]);
				}
			}
			res.status(200).json({response: data});
		})
	}
	else {
		User.find({_id: req.session.userID }, function (err, result) {
			if (err) throw err;
			let data = [];
			for (user in result) {
				for (let item in result[user][Arr]) {
					data.push(result[user][Arr][item]);
				}
			}
			res.status(200).json({response: data});
		});
	}
}

module.exports = { ReadData };