'use strict';

const request = require("request");
const config = require("../config.json");
const Twitter = require('twitter');

module.exports = (req, res) => {
  var params = req.params;
  var query = req.query;

  var client = new Twitter(config.twitter);

  if(!params.uid) res.status(500).send('User is missing.');

  // var params = {screen_name: 'dpkmallah'};
  var options = {user_id: params.uid, count: 5};

  if(query && query.max_id){
    options.max_id = query.max_id;
    options.count = options.count + 1;
  }

  if(query.count) options.count = 1;

  client.get('statuses/user_timeline', options, function(error, tweets, response) {
    if (!error) {
      res.send(tweets)
    }else {
      console.log("err err", error);
      res.status(500).send(error.message);
    }
  });
};
