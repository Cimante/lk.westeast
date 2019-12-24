const express = require('express');
const router = express.Router();

const addUser = require('../app/controllers/addUser');
const auth = require('../app/controllers/auth');

module.exports = (app) => {
	app.post('/add-user', addUser.createUser);
	app.post('/login', auth.signIn);
}