const mongoose = require('mongoose');
const guardMail = require('./guardMails');
mongoose.set('useFindAndModify', false);

const User = mongoose.model('User');

/*  
	Только для администратора
 	Входные параметры: 
		id — id записи в массиве
		storage — название массива
		status — статус (отправлено/просмотрено/обработано/отклонено)

	При статусах "Отклонена" и "Обработана" заявок [ Calls, Passports, PassCars, WorkersOrder ] отправляется письмо на info@westeast.biz
*/
const updateStatus = (req, res) => {
	if (req.session.role === 'admin') {
		switch(req.body.storage) {
			case 'Calls':
				User.findOneAndUpdate({'Calls._id': req.body.id}, 
					{$set: {
						'Calls.$.Status': req.body.status
					}
				},
				{ new: true },
				(err, result) => {
					if (err) return res.status(500).json({"err": err});
					if (!result) return res.status(404).json({"msg": "not found"})

					// Отправка письма охране
					for (let item of result.Calls) {
						if (item._id == req.body.id && item.Status != "Просмотрено") {
							guardMail('в службу эксплуатации', req.body.status, item);
						}
					}

					return res.status(200).json({result});
				})
				break

			case 'Passports':
				User.findOneAndUpdate({'Passports._id': req.body.id}, 
					{$set: {
						'Passports.$.Status': req.body.status
					}
				},
				{ new: true },
				(err, result) => {
					if (err) return res.status(500).json({"err": err});
					if (!result) return res.status(404).json({"msg": "not found"})

					// Отправка письма охране
					for (let item of result.Passports) {
						if (item._id == req.body.id && item.Status != "Просмотрено") {
							guardMail('на пропуск', req.body.status, item);
						}
					}

					return res.status(200).json({result});
				})
				break

			case 'LossCards':
				User.updateOne({'LossCards._id': req.body.id}, 
					{$set: {
						'LossCards.$.Status': req.body.status
					}
				},
				(err, result) => {
					if (err) return res.status(500).json({"err": err});
					if (!result) return res.status(404).json({"msg": "not found"})
					return res.status(200).json({result});
				})
				break

			case 'DocsOrders':
				User.updateOne({'DocsOrders._id': req.body.id}, 
					{$set: {
						'DocsOrders.$.Status': req.body.status
					}
				},
				(err, result) => {
					if (err) return res.status(500).json({"err": err});
					if (!result) return res.status(404).json({"msg": "not found"})
					return res.status(200).json({result});
				})
				break
			
			case 'PassCars':
				User.findOneAndUpdate({'PassCars._id': req.body.id}, 
					{$set: {
						'PassCars.$.Status': req.body.status
					}
				},
				{ new: true },
				(err, result) => {
					if (err) return res.status(500).json({"err": err});
					if (!result) return res.status(404).json({"msg": "not found"})
					console.log(result)
					// Отправка письма охране
					for (let item of result.PassCars) {
						if (item._id == req.body.id && item.Status != "Просмотрено") {
							guardMail('на пропуск для авто', req.body.status, item);
						}
					}

					return res.status(200).json({result});
				})
				break

			case 'WorkersOrders':
				User.findOneAndUpdate({'WorkersOrders._id': req.body.id}, 
					{$set: {
						'WorkersOrders.$.Status': req.body.status
					}
				},
				{ new: true },
				(err, result) => {
					if (err) return res.status(500).json({"err": err});
					if (!result) return res.status(404).json({"msg": "not found"})

					// Отправка письма охране
					for (let item of result.WorkersOrders) {
						if (item._id == req.body.id && item.Status != "Просмотрено") {
							guardMail('на работы', req.body.status, item);
						}
					}

					return res.status(200).json({result});
				})
				break
			default: 
				res.status(404).json({"err": "Такого хранилища не существует"})
		} 
	}
}

module.exports = { updateStatus };