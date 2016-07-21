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

function checkEntity(entity) {
    if (entity && entity.length > 0) {
        return JSON.stringify(entity);
    }

    return null;
}

function storeTweet(tweet) {
    return new Promise((fulfill, reject) => {
        let hashtags = checkEntity(tweet.entities.hashtags);
        let urls = checkEntity(tweet.entities.urls);
        let mentions = checkEntity(tweet.entities.user_mentions);
        let media = checkEntity(tweet.entities.media);
        let coordinates = null;

        if (tweet.coordinates) {
            coordinates = JSON.stringify(tweet.coordinates.coordinates);
        }

        db(config.get('TABLE_NAME')).insert({
            tweet_id: tweet.id_str,
            username: tweet.user.screen_name,
            name: tweet.user.name,
            avatar: tweet.user.profile_image_url,
            text: tweet.text,
            hashtags: hashtags,
            urls: urls,
            mentions: mentions,
            media: media,
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
