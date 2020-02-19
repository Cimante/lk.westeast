// Config Сервера

const bodyParser = require('body-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser')

module.exports = (app) => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser())

	app.use(session({
		secret: 'w381nn0v4t10n',
		resave: false,
		saveUninitialized: false,
		store: new mongoStore({
			// url: 'mongodb+srv://dbUser:qa147896325++@lk-westeast-9iq7k.mongodb.net/Sessions?retryWrites=true&w=majority'
			url : 'mongodb+srv://lk-westeast:qa147896325++@lk-cluster-1asy1.azure.mongodb.net/Sessions?retryWrites=true&w=majority'
		})
	}))
};