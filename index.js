const express = require('express');
const mongoose = require('mongoose');
require('./app/models');

const https = require('https');
const http = require('http');
const fs = require('fs');

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

mongoose.connect(mongoUri, mongoPresets)
    .then(() => { 
      https.createServer({
        key: fs.readFileSync('./private.key'),
        cert: fs.readFileSync('./certificate.crt'),
        passphrase: 'w381nn0v4710n'
      }, app).listen(appPort)

      http.createServer(function(req, res) {
        res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url});
        res.end();
      }).listen(80);
  })
    .catch((err) => console.log(`Error connecting to mongo: ${mongoUri}`, err));

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

app.get('/.well-known/pki-validation/65A7FF466CC4CB53066DAEFADC765F6E.txt', function(req, res) {
  res.sendFile('/.well-known/pki-validation/65A7FF466CC4CB53066DAEFADC765F6E.txt');
})