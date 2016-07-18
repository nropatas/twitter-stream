'use strict';

const config = require('../config');
const db = require('./db');
const Twitter = require('twit');
const client = new Twitter({
    consumer_key: config.get('TWITTER_CONSUMER_KEY'),
    consumer_secret: config.get('TWITTER_CONSUMER_SECRET'),
    access_token: config.get('TWITTER_ACCESS_TOKEN_KEY'),
    access_token_secret: config.get('TWITTER_ACCESS_TOKEN_SECRET')
});

let stream;

function storeTweet(tweet) {
    return new Promise((fulfill, reject) => {
        let coordinates = null;

        if (tweet.coordinates) {
            coordinates = JSON.stringify(tweet.coordinates.coordinates);
        }

        db(config.get('TABLE_NAME')).insert({
            username: tweet.user.screen_name,
            name: tweet.user.name,
            avatar: tweet.user.profile_image_url,
            text: tweet.text,
            entities: JSON.stringify(tweet.entities),
            coordinates: coordinates,
            time: tweet.created_at
        })
            .then(() => {
                fulfill();
            })
            .catch(reject);
    });
}

function twitter() {}

twitter.prototype.fetchTweets = (keyword) => {
    if (stream) {
        stream.stop();
    }

    stream = client.stream('statuses/filter', {
        track: keyword
    });

    stream.on('tweet', (tweet) => {
        storeTweet(tweet).then(() => {
            console.log(`Successfully stored a new tweet with keyword '${keyword}'`);
        })
            .catch(console.error);
    });

    stream.on('error', console.error);
};

module.exports = new twitter();
