'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('client'));
app.use(express.static('node_modules'));

app.get('/api/:fixture/:property?', function (req, res) {
  var fixture = require('./fixtures/' + req.params.fixture);

  if (req.params.fixture === 'investors') {
    var investors = require('./fixtures/investors').investors;
    let investor = investors.find(function(investor) {
      return investor.name === req.params.property ? investor : null;
    });
    res.json(investor);
    return;
  }

  if (req.params.property) {
    console.log(req.params.property);
    res.send(fixture[req.params.property]);
    return;
  }
  res.send(fixture);
});

app.post('/api/login', function(req, res) {
  var investors = require('./fixtures/investors').investors;
  if (investors.find(function(investor) {
    return investor.name === req.body.username;
  })) {
    res.json({isAuthenticated: true});
    return;
  } else {
    res.json({isAuthenticated: false});
    return;
  }
});

app.post('/api/test', function (req, res) {
  console.log(req.body.test);
  res.send('Success');
});

app.listen(4000, function () {
  console.log('Server now listening on port 4000!');
});
