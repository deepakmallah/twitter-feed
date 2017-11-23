const express = require('express');
const app = express();
const router = require('./routes.js');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

/**
 * Body Parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to our mongo database
mongoose.connect('mongodb://twitter:twitter!#@ds115446.mlab.com:15446/twitter');
const schema = new mongoose.Schema({
  tid: Number,
  view: Number,
  vote: Number
});
const TweetModel = mongoose.model("tweets", schema);
app.set('tweetModel', TweetModel);

function enableCORSMiddleware (req,res,next) {
  // You could use * instead of the url below to allow any origin,
  // but be careful, you're opening yourself up to all sorts of things!
  res.setHeader('Access-Control-Allow-Origin',  "*");
  next()
}
app.use(enableCORSMiddleware);

/**
 * Template Engine
 */
// app.set('view engine', 'ejs');
// app.set('views',[path.join(__dirname, '/client/views')]);

/**
 * Route setup
 */
router.route(app);

/**
 * Server init
 * @type {number}
 */
var port = 3000;
app.listen(port, function () {
  console.log('Server running on port => ' + port);
});
