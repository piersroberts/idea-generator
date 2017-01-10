var express = require("express");
var alexa = require("alexa-app");
var bodyParser = require("body-parser");


var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

var alexaApp = new alexa.app("innovator");

alexaApp.launch(function(request, response) {
  response.say("I love innovation!");
});

let words = {
	types:[
		'cloud based',
		'voice controlled',
		'offline',
		'online',
		'solid state',
		'prototype',
		'pink',
		'TED talk about a',
		'mixed reality',
		'scandalous',
		'tasty',
		'gamified',
		'native',
		'web 2.0',
		'slightly invisble',
		'cheeky',
		'hololens',
		'security focused',
		'big pharma',
		'sourdough',
		'triple filtered',
		'coffee flavoured',
		'48k',
		'temperature controlled',
		'sweet',
		'real-life',
		'waterproof',
		'fruit themed',
		'premium',
		'dumbed down',
		'scalable',
		'social',
		'mobile',
		'disruptive',
		'hydrophobic'
	],
	nouns:[
		'instagram',
		'social currency',
		'drone delivery service',
		'videogame',
		'3d printer',
		'pizzagate',
		'iOS app',
		'funk machine',
		'virtual pet',
		'jira board',
		'subreddit',
		'L E D panel',
		'fancy shirt',
		'fishing net',
		'email campaign',
		'episode of House',
		'motorboat',
		'innovation team simulator',
		'pizza oven',
		'apple TV app',
		'e-cig vapour',
		'raspberry pi clone',
		'slackbot',
		'photoshop plugin',
		'internet website',
		'4 0 4 page',
		'pop up shop',
		'experience',
		'vr experience',
		'think piece',
		'white paper',
		'webinar',
		'thing for dads',
		'pattern library'
	],
	variations:[
		'written in elm',
		'but with beacons',
		'on a USB stick',
		'built for quantom computers',
		'to run on smart fridges',
		'but for girls',
		'without all the scandal',
		'integrated in to a suit of armour',
		'written in swift',
		'written in react native',
		'with a windows 10 live tile',
		'for banks',
		'that lives in your garden',
		'designed by a famous racing car driver',
		'as a service',
		'with touch I D',
		'running on Tizen',
		'but for dogs and horses and things like that',
		'that never gets wet',
		'. jon shave edition',
		'that frightens away bees',
		'but more premium',
		'for businesses',
		'that your mum could use',
		'simulator',
		'written by my mates sister',
		'art book',
		'that attracts all types of bees',
		'that calls the police',
		'for grieving widows',
		'that cleans and straightens your teeth',
		'run from a raspberry pi inside a top hat',
		'and you can even eat the packaging',
		'that remembers where you left off',
		'that fits neatly on the outside of your pants',
		'that gets bigger in water',
		'that fits neatly between two vertebrae',
		'narrated by the cast of Seinfeld'
	],
}

function buildTextResponse(){
  	let types = words.types.sort( () => 0.5 - Math.random());
  	let nouns = words.nouns.sort( () => 0.5 - Math.random());
  	let variations = words.variations.sort( () => 0.5 - Math.random());
    let textResponse = "How about a "+types[0]+", "+types[1]+" "+nouns[0]+" "+variations[0]+"?";
    return textResponse;
}

alexaApp.intent("getIdea", {
    "utterances": [
      "give me an idea"
    ]
  },
  function(request, response) {
	response.say(buildTextResponse());
  }
);

alexaApp.intent("shipIt", {
    "utterances": [
      "ship it"
    ]
  },
  function(request, response) {
    response.say("Smashed it!");
  }
);

alexaApp.express(app, "/echo/");

app.get('/random-idea', function (request, response) {
  response.send(buildTextResponse());
})

app.listen(PORT);
console.log("Listening on port " + PORT);