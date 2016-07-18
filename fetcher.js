'use strict';

const twitter = require('./models/twitter');

twitter.fetchTweets(process.argv[2]);
