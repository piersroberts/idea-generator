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
		'nearly invisble',
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
		'hydrophobic',
		'360 degree',
		'weaponized',
		'shatterproof',
		'all singing, all dancing',
		'low energy',
		'rechargable',
		'crowdfunded',
		'vegan',
		'jumbo',
		'in car',
		'hands free',
		'static',
		'fully aware',
		'experimental',
		'automated',
		'crypto currency',
		'retro',
		'deep learning',
		'prettier',
		'self-driving',
		'compressed',
		'condensed',
		'USB C',
		'digital',
		'analog',
		'really really tall',
		'supercooled',
		'single use',
		'biodegradable',
		'good value',
		'expensive',
		'limited edition',
		'intentionally abusive',
		'foreign',
		'self-censoring',
		'sleevless',
		'family-guy branded',
		'white-label',
		'unbranded',
		'shrek endorsed',
		'friends themed',
		'spooky',
		'talking',
		'vampire based',
		'tasteless',
		'glittery',
		'organic'
	],
	nouns:[
		'webcam',
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
		'pattern library',
		'Spotify playlist',
		'food alternative',
		'projector',
		'full body scanner',
		'airport security system',
		'oilrig visualizer',
		'winamp plugin',
		'control pad',
		'bookcase',
		'self driving car',
		'cash card',
		'firewall',
		'parody twitter account',
		'website like tinder',
		'app similar to tripadvisor',
		'debugging mechanism',
		'liquid',
		'cameraphone',
		'camera',
		'record player',
		'audio format',
		'teapot',
		'set top box'
	],
	variations:[
		'written in elm',
		'but with beacons',
		'on a USB stick',
		'built for quantum computers',
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
		'narrated by the cast of Seinfeld',
		'that always know where you are',
		'that tracks your purchases',
		'like Nick Cage had in that film',
		'with an interface like the one in minority report',
		'rendering the whole thing pointless',
		'- but you mustn\'t touch it',
		'for hospitals and hotels',
		'that knows where you are going to sit',
		'that breaks down harmlessly in stomach acids',
		'compatible with Lego',
		'for meeting new people',
		'- like bitcoin',
		'for taking selfies',
		'for taking selfies of other people',
		'but without a headphone socket',
		'that doesn’t hurt when you take it off',
		'that won’t leave you, like she did',
		'for first timers',
		'that self destructs after one use',
		'that makes you laugh, but also learn',
		'that beeps when it\'s done',
		'for when there\'s a fire',
		'to get rid of that mayonaise smell',
		'but without that mayonaise smell',
		'for poor people',
		'to organise your steelbook blu-rays'
	],
}

function buildTextResponse(){
  	let types = words.types.sort( () => 0.5 - Math.random());
  	let nouns = words.nouns.sort( () => 0.5 - Math.random());
  	let variations = words.variations.sort( () => 0.5 - Math.random());
    let textResponse = "How about a "+types[0]+" "+types[1]+" "+nouns[0]+" "+variations[0]+"?";
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