/**
 * Created by deepak on 21/11/17.
 */

"use strict";

function route(app) {
  app.get("/tweets/:uid", require('./controller/tweetController'));
  app.get("/vote/:tid/:type", require('./controller/voteController'));
}

module.exports.route = route;
