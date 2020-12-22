const userRout = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

userRout.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'data', 'users.json'))
    .then((data) => {
      const dataJson = JSON.parse(data);
      return res.status(200).send(dataJson);
    })
    .catch((err) => {
      res.status(500).json({ message: `Ошибка ${err}` });
    });
});

userRout.get('/:id', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'data', 'users.json'))
    .then((data) => {
      const users = JSON.parse(data);
      const element = users.find((elem) => elem._id === req.params.id);
      if (element) {
        res.status(200).json(element);
      } else {
        res.status(404).json({ message: 'Нет пользователя с таким id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: `Ошибка ${err}` });
    });
});

module.exports = userRout;
