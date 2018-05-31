var Webtask = require('webtask-tools')
var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')

var app = express()

app.use(bodyParser.json())
app.get('/', function (req, res) {
  
  if (req.query.token !== req.webtaskContext.secrets.verification_token) {
    res.sendStatus(401);
    return;
  }
  var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + req.webtaskContext.secrets.token
  }
  
  var options = {
    uri: "https://slack.com/api/chat.postMessage",
    method: 'POST',
    headers: headers,
    json: true,
    body: {
    text: "http://lmgtfy.com/?q="+req.query.text,
    // endpoint: req.query.text,
    channel: req.query.channel_id
    }
  }

  
  request(options)
  res.sendStatus(200)
})

module.exports = Webtask.fromExpress(app)