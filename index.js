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

app.get('/', (req, res) => {
  const id = req.session.id;
  const email = req.session.email;
  const name = req.session.name;
  const role = req.session.role;
  const office = req.session.office;

  res.render('index.pug', {user: {id, email, name, role, office}});
});

app.get('/reg', function (req, res) {
  res.render('reg.pug');
});

app.get('/create-success', function (req, res) {
  res.render('create-success');
})

app.get('/dashboard', function (req, res) {
  res.render('dashboard.pug');
});