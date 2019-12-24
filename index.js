const express = require('express');
const mongoose = require('mongoose');
require('./app/models');

const app = express();
require('./config/express')(app);
require('./config/routes')(app);
const config = require('./config/app'); // index.js

const { appPort, mongoUri } = config;

app.use(express.static('public'));
app.set('view engine', 'pug');

// MongoDB Atlas
const MongoClient = require('mongodb').MongoClient;
const mongoPresets = { useNewUrlParser: true, useUnifiedTopology: true };
const mongo = new MongoClient(config.mongoUri, mongoPresets);
const dbname = "lk-westaset";

mongoose.connect(mongoUri, mongoPresets)
  .then(() => app.listen(appPort, function () {
      console.log(`Waiting you on port ${appPort}`);
    })
  )
  .catch((err) => console.error(`Error connecting to mongo: ${mongoUri}`, err))

//app.locals.collectionUsers = client.db(dbname).collection('users');

app.get('/', function (req, res) {
  res.render('index.pug');
});

app.get('/reg', function (req, res) {
  res.render('reg.pug');
});
/*
app.get('/dashboard', function (req, res) {
  res.render('dashboard.pug', {items: data});
});

app.post('/adduser', function (req, res) {
  data.push(JSON.parse(JSON.stringify(req.body)));
  res.redirect('/dashboard');
});

function createUser(req, res, next) {
  let newUser = JSON.parse(JSON.stringify(req.body));
  newUser.Pass = Math.random().toString(36).slice(-8);
  Acc.push(newUser);

  users.push({email: newUser.Email, pass: newUser.Pass, role: 'user'});
  console.log(users);

  req.dataProcessed = JSON.stringify(newUser.Email);
  return next();
}

function createUserSuccess(req, res) {
  const email = JSON.parse(req.dataProcessed);
  res.render('create-success.pug', {email});
}

app.post('/create-user', createUser, createUserSuccess);

function findUser(req, res, next) {
  let sign = JSON.parse(JSON.stringify(req.body));

  for (user in users) {
    if (users[user].email == sign.email && users[user].pass == sign.pass) {
      req.dataProcessed = {email: sign.email, role: users[user].role};
      return next();
    }
  }
};

function isFound(req, res) {
  let user = JSON.parse(JSON.stringify(req.dataProcessed));
  res.render('dashboard.pug', { login: user.email, role: user.role });
}

app.post('/auth', findUser, isFound);
*/
