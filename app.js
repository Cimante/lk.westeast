const express = require('express');
const app = express();

const data = [
  {office: 402, lname: 'Балова', fname: 'Аида', otchestvo: 'Руслановна', email: 'a.balova@fanerastroy.ru'},
  {office: 512, lname: 'Кобылюк', fname: 'Татьяна', otchestvo: '', email: 'home@salam.su'}
]

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index.pug');
});

app.get('/dashboard', function (req, res) {
  res.render('dashboard.pug', {items: data});
})

app.listen(3301, function () {
  console.log('Waiting you on port 3301');
});