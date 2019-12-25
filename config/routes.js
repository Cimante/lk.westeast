const addUser = require('../app/controllers/addUser');
const auth = require('../app/controllers/auth');
const ReadUser = require('../app/controllers/ReadUser');

module.exports = (app) => {
	app.post('/add-user', addUser.createUser);
	app.post('/login', auth.signIn);

	app.get('/logout', function(req, res) {
		if (req.session) {
			req.session.destroy(() => {
				res.redirect('/');
			});
		} else {
			res.redirect('/');
		}
	});

	app.post('/readusers', ReadUser.UsersList);
}