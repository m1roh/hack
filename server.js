const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  if (req.body.result.resolvedQuery.indexOf('Anniversaire') != -1 || req.body.result.resolvedQuery.indexOf('anniversaire') != -1) {
    console.log();

    var request = require("request");

    var options = {
      method: 'GET',
      url: 'https:www.googleapis.com/calendar/v3/calendars/9vsmpmq2r3vr0rtssqsamsoj8g@group.calendar.google.com/events',
      headers: {
        'Postman-Token': '594fef0b-7526-9893-7934-209cc7ad4ee5',
        'Cache-Control': 'no-cache',
        Authorization: 'OAuth ya29.GlshBQDijN9v_i_h43kiyu6hLVgzqxKkCryqp_2qSOm6ZZuBvGWeVkgBTqbdgcT-6QL2KZWn2aE3x0coRUU4cNUqBkRkXZV8ZOREfl9v00s2fIzwuXki3IoN5FcV'
      }
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      let data = JSON.parse(body);
      let dataToSend = data.items[0].summary
      console.log(dataToSend);

      return res.json({
        speech: `C'est l'${dataToSend.toLowerCase()}`,
        displayText: dataToSend,
        source: 'google agenda'
      });
    });
  }

  if (req.body.result.resolvedQuery.indexOf('meteo') != -1 || req.body.result.resolvedQuery.indexOf('temps') != -1) {

    let request = require('request');

    let apiKey = '2c8c22e7283717b657e8dd338db9fc51';
    let city = 'bordeaux';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=fr`

    request(url, function (err, response, body) {
      let data = JSON.parse(body);
      let dataToSend = data.weather[0].main;
      console.log(dataToSend);
      if (err) {
        console.log('error:', error);
      } else {
        console.log('body:', body);
        return res.json({
          speech: `Il fait ${dataToSend}`,
          displayText: `Il fait ${dataToSend}`,
          source: 'OpenWeather'
        });
      }
    });
  };
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});