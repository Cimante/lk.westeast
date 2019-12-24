const mongoose = require('mongoose');
const bCrypt = require('bcryptjs');

const newUser = mongoose.model('User');

const createUser = (req, res, next) => {
	let tempData = JSON.parse(JSON.stringify(req.body));
	let password = Math.random().toString(36).slice(-8);

	tempData.Password = bCrypt.hashSync(password);
	tempData.Role = "user";

	newUser.create(tempData, function(err) {
		if (err) throw err;
	});
	console.log(`PASS: ${password}`);
	console.log(tempData);
	res.render('create-success', {email: tempData.Email});
}

module.exports = {
	createUser
}