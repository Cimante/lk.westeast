const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();

let data = [
  { Office: 402, LastName: 'Балова', FirstName: 'Аида', MiddleName: 'Руслановна', Email: 'a.balova@fanerastroy.ru'},
  { Office: 512, LastName: 'Кобылюк', FirstName: 'Татьяна', MiddleName: '', Email: 'home@salam.su'},
  { Office: 303, LastName: 'Яцкевич', FirstName: 'Наталья', MiddleName: 'Александровна', Email: 'profiprojectgroup@yandex.ru'}
]

let Acc = [];

const admins = [
  {email: "test@test.email", pass: "1234"}
];

const users = [
  {email: 'test@test.com', pass: '0000', role: 'user'},
  {email: 'test@test.email', pass: '1111', role: 'admin'}
];

app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.render('index.pug');
});

app.get('/reg', function (req, res) {
  res.render('reg.pug');
})

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

app.listen(3301, function () {
  console.log('Waiting you on port 3301');
});