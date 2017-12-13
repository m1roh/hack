const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const apiai = require('apiai');

const PORT = process.env.PORT || 5000;

const app = express();
// const hook = apiai("c2e976879b1a4f9c822185d7caf30888");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/anniversaire', (req, res) => {
  /* var request = hook.textRequest(req.body.request, {
    sessionId: '201c816f-6e4a-446e-b7df-6feae9a5d8cd'
  });
  request.on('response', function (response) {
    console.log(response)
    res.json(response);
  });

  request.on('error', function (error) {
    console.log(error);
  });

  

  request.end(); */
  var request = require("request");

  var options = {
    method: 'GET',
    url: 'https://www.googleapis.com/calendar/v3/calendars/9vsmpmq2r3vr0rtssqsamsoj8g@group.calendar.google.com/events',
    headers:
      {
        'Postman-Token': '594fef0b-7526-9893-7934-209cc7ad4ee5',
        'Cache-Control': 'no-cache',
        Authorization: 'OAuth ya29.GlshBdndqj_cnF6clgGNWcGlbm75yLWiT-4XWCaxHvV7ls0lE-kiodOAC2EB0ebGLdXFXtjTiECYXa4N_l2eW0hfMQx5y3v5dHBez6V4ccBEjJqoQbIBXT-gqKh6'
      }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    let data = JSON.parse(body);
    let dataToSend = data.items[0].summary
    console.log(dataToSend);

    return res.json({
      speech: `C'est l'${dataToSend}`,
      displayText: dataToSend,
      source: 'get-movie-details'
    });
  });
});


app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
