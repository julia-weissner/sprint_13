const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userRout = require('./routes/users');
const cardRout = require('./routes/cards');

const app = express();

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', userRout);
app.use('/cards', cardRout);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
