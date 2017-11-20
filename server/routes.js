/**
 * Created by deepak on 21/11/17.
 */

"use strict";

function route(app) {
  app.get("/tweets/:uid", require('./controller/tweetController'));
}

module.exports.route = route;
