const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const User = mongoose.model('User');
/* 
	Обязательные поля: ArrayName и Office. 
	ArrayName - имя массива в модели User;
	Office - номер офиса. Для админа служит поисковым запросом среди записей. 
	Пользователи ищутся по Email, записанном в массиве session (при авторизации)

	Если поле ArrayName не задан, то обновлять пользовательские данные, иначе обновлять запись
*/
const InsertData = (req, res) => {
	if (!req.body.ArrayName) {
		User.findOneAndUpdate({_id: req.body.id}, { 
			$set: {
			"LastName": req.body.LastName,
			"FirstName": req.body.FirstName,
			"MiddleName": req.body.MiddleName,
			"Office": req.body.Office,
			"Email": req.body.Email,
			"Phone": req.body.Phone,
			"FullCompanyName": req.body.FullCompanyName,
			"ShortCompanyName": req.body.ShortCompanyName,
			"Address": req.body.Address,
			"INN": req.body.INN, // (req.body.INN.isNull()) ? "(не указан)" : req.body.INN;
			"KPP": req.body.KPP,
			"OGRN": req.body.OGRN,
			"Bank": req.body.Bank,
			"BIK": req.body.BIK,
			"CorporateAcc": req.body.CorporateAcc,
			"PaymentAcc": req.body.PaymentAcc
		}}).exec(function(err, result) {
			if (err) {
				res.status(500).json({response: err});
			} else {
				res.status(200).json({ok: true});
			}
		})
	}

	else {
		const ArrayName = req.body.ArrayName;
		delete req.body.ArrayName;

		req.body.Status = 'Отправлено';
		
		if (req.session.role === 'admin') {
			User.findOneAndUpdate({ "Office": req.body.Office }, {$push: {[ArrayName]: req.body}}, function(err, result) {
				if (err) throw err;
				res.status(200).json({data: result});
			});
		}

		else if (req.session.role === 'user') {
			let data = {};
			data.Office = req.session.office
			const query = User.find({"Email": req.session.email}, {FullCompanyName: 1});

			query.then((result) => {
				data.CompanyName = result[0].FullCompanyName;
				for (let item in req.body) {
					data[item] = req.body[item];
				}
			}).then(() => {
				User.findOneAndUpdate({ "Email": req.session.email }, {$push: {[ArrayName]: data}}, function(err, result) {
					if (err) throw err;
					res.status(200).json({});
				});
			})
		}
		else {
			res.status(401).json({ message: 'Отказано в доступе' });
		}
	}
}

module.exports = { InsertData };