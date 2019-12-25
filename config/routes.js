const addUser = require('../app/controllers/addUser');
const auth = require('../app/controllers/auth');
// const exit = require('../app/controllers/exit');

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
}