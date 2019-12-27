// Добавляем заявку в БД по названию массива

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const User = mongoose.model('User');

const InsertData = (req, res) => {
	console.log(typeof req.body, req.body);
	if (req.session.role === 'admin') {
		let data = {
			Office: req.body.Office,
			Date: req.body.Date,
			Timestamp: req.body.Timestamp,
			Status: 'Отправлено'
		}
		User.findOneAndUpdate({ "Office": data.Office }, {$push: {Calls: data}}, function(err, result) {
			if (err) throw err;
			res.status(200).json({ result: result.Calls });
		});
	}

	else if (req.session.role === 'user') {
		let data = {
			Office: req.session.Office,
			Date: req.body.Date,
			Timestamp: req.body.Timestamp,
			Status: 'Отправлено'
		}
		User.findOneAndUpdate({ "Office": data.Office }, {$push: {Calls: data}}, function(err, result) {
			if (err) throw err;
			res.status(200).json({ result: result.Calls });
		});
	}
	
	else {
		res.status(401).json({ message: 'Отказано в доступе' });
	}
}

module.exports = { InsertData };