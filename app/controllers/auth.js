const mongoose = require('mongoose');
const bCrypt = require('bcryptjs');

const User = mongoose.model('User');

const signIn = (req, res) => {
	const { email, password } = JSON.parse(JSON.stringify(req.body));
	
	User.findOne({ Email: email })
		.exec()
		.then((user) => {
			if (!user) {
				res.status(401).json({ message: 'Неверная пара email / пароль' });
			}
			const isValid = bCrypt.compareSync(password, user.Password);

			if (isValid) {
				req.session.userID = user._id;
				req.session.email = user.Email;
				req.session.office = user.Office;
				req.session.name = user.FirstName;
				req.session.role = user.Role;

				res.status(200).json({ office: req.session.office, role: req.session.role, ok: true });
				
			} else {
				res.status(401).json({ message: 'Неверная пара email / пароль' });
			}
		})
		.catch(err => res.status(500).json({message: err.message}));
};

module.exports = {
	signIn,
};