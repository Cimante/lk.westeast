const mongoose = require('mongoose');
const bCrypt = require('bcryptjs');
const sendPass = require('./sendPass');

const newUser = mongoose.model('User');

const createUser = (req, res, next) => {
	let tempData = req.body;
	let password = Math.random().toString(36).slice(-8);

	console.log(tempData);

	tempData.Password = bCrypt.hashSync(password);
	tempData.Role = "user";

	newUser.create(tempData, function(err) {
		if (err) throw err;
	});
	// console.log(`PASS: ${password}`);

	sendPass(password, tempData.Email);

	res.status(200).json({ email: tempData.Email });
}

module.exports = {
	createUser
}