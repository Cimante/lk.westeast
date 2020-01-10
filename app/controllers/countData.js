const mongoose = require('mongoose');
const User = mongoose.model('User');

const Count = (req, res) => {
	if (req.session.role === 'admin') {
		User.find({Role: 'user'}, function(err, result) {
			if (err) throw err;
			let data = {
				Calls: 0,
				Passports: 0,
				LossCards: 0,
				DocsOrders: 0,
				PassCars: 0,
				WorkersOrders: 0
			};
			for (let key in result) {
				for (item in result[key].Calls) {
					if (result[key].Calls[item].Status === 'Отправлено') {
						data.Calls += 1;
					};
				}
				for (item in result[key].Passports) {
					if (result[key].Passports[item].Status === 'Отправлено') {
						data.Passports += 1;
					};
				}
				for (item in result[key].LossCards) {
					if (result[key].LossCards[item].Status === 'Отправлено') {
						data.LossCards += 1;
					};
				}
				for (item in result[key].DocsOrders) {
					if (result[key].DocsOrders[item].Status === 'Отправлено') {
						data.DocsOrders += 1;
					};
				}
				for (item in result[key].PassCars) {
					if (result[key].PassCars[item].Status === 'Отправлено') {
						data.PassCars += 1;
					};
				}
				for (item in result[key].WorkersOrders) {
					if (result[key].WorkersOrders[item].Status === 'Отправлено') {
						data.WorkersOrders += 1;
					};
				}
			}

			res.status(200).json(data);
		});
	}
	else {
		res.status(200);
	}
}

module.exports = { Count };