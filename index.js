var token   = process.env.SLACK_TOKEN;
var express = require('express');

var app        = express();
var bodyParser = require('body-parser');

// Libs
var Stock = require('./lib/stock.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
 res.send('Ready to quote..');
});

//  We should try to offer the user the ability to get basic information very easily
//  But if they'd like to do more, they can. So imagine something like
//
//  /quote AAPL
//
//  Simply returns the current price and graph but you can layer in other commands as
//  well like the following

//  /quote AAPL earnings
//  /quote AAPL market_cap
//  /quote AAPL revenue
//  /quote AAPL news
//  /quote AAPL pe


app.post('/quote', function(req, res) {
  var body = req.body;

  var stock         = new Stock();
  var incomingToken = body.token;
  var response      = {};

  // Bro, do you even objectify?
  stock.ticker = body.text;

  if (incomingToken == token) {

    if (stock.exists()){
      console.log("exists");
      response = {
        response_type: 'in_channel',
        attachments: [
          {
            text: stock,
            image_url: 'http://finviz.com/chart.ashx?t=' + stock.ticker + '&ty=c&ta=1&p=d&s=l'
          }
        ]
      };
    }else{
      console.log("does not exist");
      response = {
        response_type: 'in_channel',
        attachments: [
          {
            text: "Stock note found - are you sure you typed the ticker in correctly?"
          }        
        ]
      }
    }

    res.json(response);
  } else {
    res.status(500);
    res.send('Unauthorized');
  }
});

app.listen(process.env.PORT || 8000, function() {
  console.log("Ready to quote...");
});

