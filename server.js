const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const apiai = require('apiai');

const PORT = process.env.PORT || 5000;

const app = express();
const hook = apiai("c2e976879b1a4f9c822185d7caf30888");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/test', (req, res) => {
  var request = hook.textRequest(req.body.request, {
    sessionId: '201c816f-6e4a-446e-b7df-6feae9a5d8cd'
  });
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
