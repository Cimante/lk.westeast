const addUser = require('../app/controllers/addUser');
const auth = require('../app/controllers/auth');

module.exports = (app) => {
	app.post('/add-user', addUser.createUser);
	app.post('/signin', auth.signIn);
}