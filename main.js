var apiai = require('apiai');

var app = apiai("c2e976879b1a4f9c822185d7caf30888");

var request = app.textRequest('Je suis invité ce soir', {
  sessionId: '201c816f-6e4a-446e-b7df-6feae9a5d8cd'
});

request.on('response', function (response) {
  console.log(response);
});

request.on('error', function (error) {
  console.log(error);
});

request.end();
