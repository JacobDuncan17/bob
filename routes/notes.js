const fs = require('fs');
const db = require('../db/db.json');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

router.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;

    res.send(data);
  });
});

router.post('/api/notes', (req, res) => {
  const newNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text,
  };
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;

    const newData = JSON.parse(data);

    newData.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(newData), (err) => {
      if (err) throw err;

      res.send('successfully added');
    });
  });
});

router.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;

    const newData = JSON.parse(data).filter(note => note.id !== noteId);

    fs.writeFile('./db/db.json', JSON.stringify(newData), (err) => {
      if (err) throw err;

      res.send('successfully deleted');
    });
  });
});

module.exports = router;
