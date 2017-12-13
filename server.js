const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const apiai = require('apiai');
const API_URL = "http://api.openweathermap.org/data/2.5/weather?lang=fr&units=metric&q="; // première partie de la route
const API_KEY = "2c8c22e7283717b657e8dd338db9fc51"; // key de connexion

const PORT = process.env.PORT || 5000;

const app = express();
// const hook = apiai("c2e976879b1a4f9c822185d7caf30888");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/anniversaire', (req, res) => {
  if (req.body.result.resolvedQuery.indexOf('Anniversaire') != -1) {
    console.log();

    var request = require("request");

    var options = {
      method: 'GET',
      url: 'https://www.googleapis.com/calendar/v3/calendars/9vsmpmq2r3vr0rtssqsamsoj8g@group.calendar.google.com/events',
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
        speech: `C'est l'${dataToSend}`,
        displayText: dataToSend,
        source: 'google agenda'
      });
    });
  }
});

app.post('/anniversaire', (req, res) => {
  if (req.body.result.resolvedQuery.indexOf('meteo') != -1 || req.body.result.resolvedQuery.indexOf('temps') != -1) {
    console.log();

    var request = require("request");

    this.get = function () { // On déclare une route.get, on y passe city qu'on récupera ultérieurement

      $log.debug(LOGNS, `requesting bordeaux weather`); // Affiche une erreur
      var deferred = $q.defer(); // defer = ?

      $http.get(API_URL + 'bordeaux' + "&APPID=" + API_KEY).then((response) => { // On fait l'appel à l'api ici ou du moins on en crée la route

        $log.debug(LOGNS, `Bordeaux weather is ${response.data.weather[0].main}`); // Affiche une erreur 

        // Add the default icon url to the retrieved weather object
        try {
          response.data.icon = `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`; // On va chercher l'icone du temps
        } catch (e) { // Erreur
          $log.warn(LOGNS, e);
        }

        deferred.resolve(response.data); // Defer on y mets la réponse?

      }).catch((error) => {
        var message = error.data ? error.data.message : error.message || error.statusText;
        $log.debug(LOGNS, `bordeaux weather request error ${message}`);
        deferred.reject(message); // Erreur
      });

      return deferred.promise; // Return peu importe trouvé ou erreur
    };
  };
});



/* app.use(express.static(path.join(__dirname, 'public'))); */

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});