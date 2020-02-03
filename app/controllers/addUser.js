const mongoose = require('mongoose');
const bCrypt = require('bcryptjs');
const sendPass = require('./sendPass');

const newUser = mongoose.model('User');

const createUser = (req, res, next) => {
	let tempData = req.body;
	let password = Math.random().toString(36).slice(-8);

	// проверка на существование полей
	if (!('INN' in tempData)) tempData.INN = "(не указан)";
	if (!('KPP' in tempData)) tempData.KPP = "(не указан)";
	if (!('OGRN' in tempData)) tempData.OGRN = "(не указан)";
	if (!('Bank' in tempData)) tempData.Bank = "(не указан)";
	if (!('BIK' in tempData)) tempData.BIK = "(не указан)";
	if (!('CorporateAcc' in tempData)) tempData.CorporateAcc = "(не указан)";
	if (!('PaymentAcc' in tempData)) tempData.PaymentAcc = "(не указан)";

	tempData.Password = bCrypt.hashSync(password);
	tempData.Role = "user";

	newUser.create(tempData, function(err) {
		if (err) {
			console.log(err);
			res.status(500).json(err);
		} else {
			sendPass(password, tempData.Email);
			res.status(200).json({ email: tempData.Email });
		}
	});

	
}

module.exports = {
	createUser
}