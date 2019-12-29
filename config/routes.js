const addUser = require('../app/controllers/addUser');
const auth = require('../app/controllers/auth');
const ReadUser = require('../app/controllers/ReadUser');
const InsertData = require('../app/controllers/InsertData');
const ReadData = require('../app/controllers/ReadData');
const DeleteUser = require('../app/controllers/DeleteUser');

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

	app.post('/read-users', ReadUser.UsersList);
	app.post('/read-user', ReadUser.OneUser);
	app.post('/insert-data', InsertData.InsertData);
	app.post('/read-data', ReadData.ReadData);
	app.post('/delete-user', DeleteUser.DeleteUser);
}