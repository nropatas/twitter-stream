'use strict';

const config = require('../config');
const Twitter = require('twit');
const client = new Twitter({
    consumer_key: config.get('TWITTER_CONSUMER_KEY'),
    consumer_secret: config.get('TWITTER_CONSUMER_SECRET'),
    access_token: config.get('TWITTER_ACCESS_TOKEN_KEY'),
    access_token_secret: config.get('TWITTER_ACCESS_TOKEN_SECRET')
});

function twitter() {}

twitter.prototype.fetchTweets = (keyword) => {
    let stream = client.stream('statuses/filter', {
        track: keyword
    });

    stream.on('tweet', (tweet) => {
        console.log(tweet.text);
    });

    stream.on('error', console.error);
};

module.exports = new twitter();
