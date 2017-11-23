'use strict';

const request = require("request");
const config = require("../config.json");
const Twitter = require('twitter');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  uid: Number,
  tid: Number,
  view: Number
});
const Reminder = mongoose.model("Reminder", schema);
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

  if(query.count){
    options.count = 1;


  }

  client.get('statuses/user_timeline', options, function(error, tweets, response) {
    if (!error) {

      if(options.count === 1){
        var tid = options.max_id;
        var uid = options.user_id;

        findAndUpdate(tid, uid)
          .then(tweetData => {
            tweets[0]["viewCount"] = tweetData.view;
            res.send(tweets)
          })
          .catch(err => {
            console.log("tweetData, err", err)
            res.status(500).send(err.message);
          })
      }else{
        res.send(tweets)
      }
    }else {
      console.log("err err", error);
      res.status(500).send(error.message);
    }
  });

  function findAndUpdate(tid, uid) {
    return new Promise((resolve, reject) => {
      Reminder.findOne({tid: tid, uid: uid}, {}, function (err, tweet) {
        if (err) return reject(err);

        if(tweet){
          tweet.view += 1;
          tweet.save(function (error, updatedTweet) {
            if (error) reject(error);

            resolve(updatedTweet)
          });
        }else{
          tweetView(tid, uid)
            .then(tweetview => {
              resolve(tweetview)
            })
            .catch(err => {
              reject(err)
            })
        }
      })
    });
  }

  function tweetView(tid, uid){
    var tweetData = {tid: tid, uid: uid, view: 1};
    return new Promise((resolve, reject) => {
      var data = new Reminder(tweetData);
      data.save()
        .then(item => {
          resolve(item);
        })
        .catch(err => {
          console.log("err err err err", err)
          reject(err);
        });
    });
  }
};
