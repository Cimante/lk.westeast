const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const User = mongoose.model('User');
/* 
	Обязательные поля: ArrayName и Office. 
	ArrayName - имя массива в модели User;
	Office - номер офиса. Для админа служит поисковым запросом среди записей. 
	Пользователи ищутся по Email, записанном в массиве session (при авторизации)
*/
const InsertData = (req, res) => {
	const ArrayName = req.body.ArrayName;
	delete req.body.ArrayName;

	console.log(req.body);
	req.body.Status = 'Отправлено'
	
	if (req.session.role === 'admin') {
		User.findOneAndUpdate({ "Office": req.body.Office }, {$push: {[ArrayName]: req.body}}, function(err, result) {
			if (err) throw err;
			res.status(200).json({});
		});
	}

	else if (req.session.role === 'user') {
		User.findOneAndUpdate({ "Email": req.session.email }, {$push: {[ArrayName]: req.body}}, function(err, result) {
			if (err) throw err;
			res.status(200).json({});
		});
	}
	
	else {
		res.status(401).json({ message: 'Отказано в доступе' });
	}
}
module.exports = { InsertData };