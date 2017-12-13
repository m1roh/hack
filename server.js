// app.js
'use strict';
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const path = require('path');

app.use(bodyParser.json());

//LIST
app.get('/', function (req, res) {
  // res.json({ message: 'Hello' + req.params.name });
  res.sendFile(path.join(__dirname + '/index.html'));
});

//CREATE
app.post('/', (req, res) => {
  let hook = req.body;
  console.log(hook.name);
  res.send('ok');
});

//EDIT
app.put('/', (req, res) => {
  let hook = req.body;

  if (hook.id === undefined) {
    res.status(400).json({ "message": "id is required" });
  }
  else {
    console.log(hook.name);
    res.send({ "modified_name": hook.name });
  }
});

//DELETE
app.delete('/:id', (req, res) => {
  res.send(req.params.id);
});

app.listen(port, function () {
  console.log('Example app listening on port', port);
});
