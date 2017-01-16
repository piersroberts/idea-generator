var express = require('express');
var alexa = require('alexa-app');
var bodyParser = require('body-parser');
var cors = require('cors');
var words = require('./words/innovation');


var app = express();
var PORT = process.env.PORT || 8081;

var corsOptions = {
  origin: '*'
}

const VOWELS = ['a','e','i','o','u'];

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");

var alexaApp = new alexa.app("innovator");

alexaApp.launch(function (request, response) {
  response.say("I love innovation!");
});

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function buildTextResponse() {
  let types = words.types.sort(() => 0.5 - Math.random());
  let nouns = words.nouns.sort(() => 0.5 - Math.random());
  let variations = words.variations.sort(() => 0.5 - Math.random());

  let type = '';
  for (i = 0; i < getRandomInt(0, 2); i++) {
    type += types[i] + " ";
  }

  if(VOWELS.indexOf((type + nouns)[0]) < 0 ){
    type = 'a '+type+' ';
  }else{
    type = 'an '+type+' ';
  }
  let textResponse = "How about " + type + nouns[0] + " " + variations[0] + "?";
  return textResponse;
}

alexaApp.intent("getIdea", {
    "utterances": [
      "give me an idea"
    ]
  },
  function (request, response) {
    response.say(buildTextResponse());
  }
);

alexaApp.intent("shipIt", {
    "utterances": [
      "ship it"
    ]
  },
  function (request, response) {
    response.say("Smashed it!");
  }
);

alexaApp.express(app, "/echo/");

app.get('/random-idea', cors(corsOptions), function (request, response, next) {
  response.send(buildTextResponse());
})

app.listen(PORT);
console.log("Listening on port " + PORT);