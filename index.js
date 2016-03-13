var token   = process.env.SLACK_TOKEN;
var express = require('express');

var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
 res.send('Ready to quote..');
});

app.post('/quote', function(req, res) {
  var body = req.body;

  var stock         = body.text;
  var incomingToken = body.token;

  if (incomingToken == token) {
    var response = {
      response_type: 'in_channel',
      attachments: [
        {
          text: stock,
          image_url: 'http://chart.finance.yahoo.com/z?z=l&s=' + stock
        }
      ]
    };

    res.json(response);
  } else {
    res.status(500);
    res.send('Unauthorized');
  }
});

app.listen(process.env.PORT || 8000, function() {
  console.log("Ready to quote...");
});

