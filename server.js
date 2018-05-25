// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:Time", function (req, res, next) {
  //gets request data
  var time = req.params.Time;
  //set the format our natural date should be returned in
  var dateFormat = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  //check if request data is a string
  if (isNaN(time)) {
    var naturalDate = new Date(time);
    //check if the string converts to a valid date
    if (isNaN(naturalDate.getTime())) {
      naturalDate = null;
      var unixDate = null;
    }
    else {
      naturalDate = naturalDate.toLocaleDateString("en-us", dateFormat);
      var unixDate = new Date(time).getTime()/1000;
    }
  }
  //request data is a number
  else {
    var unixDate = time;
    var naturalDate = new Date(time*1000);
    naturalDate = naturalDate.toLocaleDateString("en-us", dateFormat);
  }
  res.json({unix: unixDate, natural: naturalDate});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
