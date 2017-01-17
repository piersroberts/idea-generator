var express = require('express');
var alexa = require('alexa-app');
var bodyParser = require('body-parser');
var cors = require('cors');



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

function shuffleWords(words){
  return {
    types:words.types.sort(() => 0.5 - Math.random()),
    actions:words.actions.sort(() => 0.5 - Math.random()),
    nouns:words.nouns.sort(() => 0.5 - Math.random()),
    variations:words.variations.sort(() => 0.5 - Math.random())
  };
}

function buildTextResponse() {
  var words = shuffleWords(require('./words/innovation'));


  let type = '';
  for (i = 0; i < getRandomInt(0, 2); i++) {
    type += words.types[i] + " ";
  }

  if(VOWELS.indexOf((type + words.nouns)[0]) < 0 ){
    type = 'a '+type+' ';
  }else{
    type = 'an '+type+' ';
  }
  let textResponse = "How about " + type + words.nouns[0] + " " + words.variations[0] + "?";
  return textResponse;
}

function buildGameIdea(){
  var words = shuffleWords(require('./words/videogames'));
  
  let firstPart = ``;
    for (i = 0; i < getRandomInt(0, 2); i++) {
    firstPart += words.types[i] + ` `;
  }
  firstPart += (firstPart ? `` : `game `) + words.actions[0];

  if(VOWELS.indexOf(firstPart[0]) < 0 ){
    firstPart = 'a '+firstPart+' ';
  }else{
    firstPart = 'an '+firstPart+' ';
  }

  let secondPart = words.nouns[0];

  return `How about ${firstPart} ${secondPart} ${words.variations[0]}`

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

app.get('/random-game', cors(corsOptions), function (request, response, next) {
  response.send(buildGameIdea());
})

app.listen(PORT);
console.log("Listening on port " + PORT);