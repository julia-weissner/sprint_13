const cardRout = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

cardRout.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'data', 'cards.json'))
    .then((data) => {
      const dataJson = JSON.parse(data);
      return res.status(200).send(dataJson);
    })
    .catch((err) => {
      res.status(500).json({ message: `Ошибка ${err}` });
    });
});

module.exports = cardRout;
