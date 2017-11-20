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
