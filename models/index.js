'use strict';

const db = require('./db');
const twitter = require('./twitter');

function index() {}

index.prototype.getTweetsFromDb = (keyword) => {

};

index.prototype.fetch = (keyword) => {
    twitter.fetchTweets(keyword);
};

module.exports = new index();
