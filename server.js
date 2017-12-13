const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();

var apiai = require('apiai');

var hook = apiai("c2e976879b1a4f9c822185d7caf30888");

var request = hook.textRequest('Je suis invité ce soir', {
  sessionId: '201c816f-6e4a-446e-b7df-6feae9a5d8cd'
});

app.post('/', (req, res) => {
  request.on('response', function (response) {
    console.log(response)
    res.json(response);
  });

  request.on('error', function (error) {
    console.log(error);
  });

  

  request.end();
});


app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
