const mongoose = require('mongoose');
const User = mongoose.model('User');

const ReadData = (req, res) => {
	// TODO: если данные читает админ, то статус отправлено меняется на статус просмотрено
	const Arr = req.body.Arr;
	if (req.session.role === 'admin') {
		User.find({Role: 'user'}, function (err, result) {
			if (err) throw err;
			let data = [];
			for (user in result) {
				data.push(result[user][Arr]);
			}

			// делаем из массива массивов объектов обычный массив объектов
			data = data.reduce(function(a, b) {
				return a.concat(b);
			});
			res.status(200).json({ response: data });
		})
	}
	else {
		User.find({_id: req.session.userID}, function (err, result) {
			if (err) throw err;
			let data = [];
			for (user in result) {
				data.push(result[user][Arr]);
			}

			// делаем из массива массивов объектов обычный массив объектов
			data = data.reduce(function(a, b) {
				return a.concat(b);
			});
			res.status(200).json({ response: data });
		});
	}
}

module.exports = { ReadData };