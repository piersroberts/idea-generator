var alexa = require("alexa-app");
var app = new alexa.app("alexainnovator");
 
app.intent("getIdea", {
    "utterances": [
'give me an idea',
'come up with an idea',
'get me an idea'
    ]
  },
  function(request, response) {
    var number = request.slot("number");
    response.say("You asked for the number " + number);
  }
);