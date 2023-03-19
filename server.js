const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

const API = require('./routes/notes');
const HTML = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(API);
app.use(HTML);

app.listen(PORT, () => {
  console.log(`App running on http:/localhost:${PORT}`);
});