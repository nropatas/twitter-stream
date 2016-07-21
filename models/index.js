'use strict';

const config = require('../config');
const db = require('./db');
const twitter = require('./twitter');

function index() {}

index.prototype.getTweetsFromDb = () => {
    return db(config.get('TABLE_NAME')).orderBy('id', 'desc');
};

index.prototype.fetch = (keyword) => {
    twitter.fetchTweets(keyword);
};

module.exports = new index();
