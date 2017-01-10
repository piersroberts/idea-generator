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
		'securtiy focused',
		'big pharma'
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
		'email campaign'
	],
	variations:[
		'writen in elm',
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
		'designed by a famous racing car driver'
	],
}

alexaApp.intent("getIdea", {
    "utterances": [
      "give me an idea"
    ]
  },
  function(request, response) {
  	let types = words.types.sort( function() { return 0.5 - Math.random() } );
  	let nouns = words.nouns.sort( function() { return 0.5 - Math.random() } );
  	let variations = words.variations.sort( function() { return 0.5 - Math.random() } );
    response.say("How about a "+types[0]+" "+types[1]+" "+nouns[0]+" "+variations[0]);
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

app.listen(PORT);
console.log("Listening on port " + PORT + ", try http://localhost:" + PORT + "/echo/test");