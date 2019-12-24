const mongoose = require('mongoose');
const bCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/app');

const User = mongoose.model('User');

const signIn = (req, res) => {
	const { Email, pass } = JSON.parse(JSON.stringify(req.body));
	User.findOne({ Email: Email })
		.exec()
		.then((user) => {
			if (!user) {
				res.status(401).json({ message: 'User does not exist...' });
			}
			const isValid = bCrypt.compareSync(pass, user.Password);

			if (isValid) {
				const token = jwt.sign(user._id.toString(), jwtSecret);
				res.status(200).json({ token: token });
				
				// res.render('dashboard', {login: user.Email, role: user.Role});
				
			} else {
				res.status(401).json({message: 'Invalid credentials'})
			}
		})
		.catch(err => res.status(500).json({message: err.message}));
};

module.exports = {
	signIn,
};