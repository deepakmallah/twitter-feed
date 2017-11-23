/**
 * Created by deepak on 23/11/17.
 */
'use strict';

const request = require("request");

module.exports = (req, res) => {
  var params = req.params;

  const TweetModel = req.app.get('tweetModel');

  if(!params.tid && !params.type) res.status(500).send("Details missing.");

  if(["up", "down"].indexOf(params.type) === -1) res.status(500).send("Unsupported type.");

  findAndUpdate(params.tid, params.type)
    .then(resp => {
      res.send(resp)
    })
    .catch(err => {
      res.status(500).send(err.message);
    });

  function findAndUpdate(tid, type) {
    return new Promise((resolve, reject) => {
      TweetModel.findOne({tid: tid}, {}, function (err, tweet) {
        if (err) return reject(err);

        if(!tweet) return reject({"message": "Tweet data not found."});

        if(tweet[type]){
          tweet[type] += 1;
        }else{
          tweet[type] = 1;
        }

        tweet.save(function (error, updatedTweet) {
          if (error) return reject(error);

          return resolve(updatedTweet)
        });
      })
    });
  }
};
