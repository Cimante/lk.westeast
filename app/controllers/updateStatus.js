const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const User = mongoose.model('User');

/*  
	Только для администратора
 	Входные параметры: 
		id — id записи в массиве
		storage — название массива
		status — статус (отправлено/просмотрено/обработано/отклонено)
*/
const updateStatus = (req, res) => {
	if (req.session.role === 'admin') {
		switch(req.body.storage) {
			case 'Calls':
				User.updateOne({'Calls._id': req.body.id}, 
					{$set: {
						'Calls.$.Status': req.body.status
					}
				},
				(err, result) => {
					if (err) return res.status(500).json({"err": err});
					if (!result) return res.status(404).json({"msg": "not found"})
					return res.status(200).json({result});
				})
				break

			case 'Passports':
				User.updateOne({'Passports._id': req.body.id}, 
					{$set: {
						'Passports.$.Status': req.body.status
					}
				},
				(err, result) => {
					if (err) return res.status(500).json({"err": err});
					if (!result) return res.status(404).json({"msg": "not found"})
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
				User.updateOne({'PassCars._id': req.body.id}, 
					{$set: {
						'PassCars.$.Status': req.body.status
					}
				},
				(err, result) => {
					if (err) return res.status(500).json({"err": err});
					if (!result) return res.status(404).json({"msg": "not found"})
					return res.status(200).json({result});
				})
				break

			case 'WorkersOrders':
				User.updateOne({'WorkersOrders._id': req.body.id}, 
					{$set: {
						'WorkersOrders.$.Status': req.body.status
					}
				},
				(err, result) => {
					if (err) return res.status(500).json({"err": err});
					if (!result) return res.status(404).json({"msg": "not found"})
					return res.status(200).json({result});
				})
				break
			default: 
				res.status(404).json({"err": "Такого хранилища не существует"})
		} 
		
	}
}

module.exports = { updateStatus };