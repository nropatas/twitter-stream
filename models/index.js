'use strict';

const config = require('../config');
const db = require('./db');
const twitter = require('./twitter');

function index() {}

index.prototype.getTweetsFromDb = (keyword) => {
    return db(config.get('TABLE_NAME')).where(db.raw(`LOWER(text) LIKE ?`, `%${keyword}%`))
        .orderBy('id', 'desc');
};

index.prototype.fetch = (keyword) => {
    twitter.fetchTweets(keyword);
};

module.exports = new index();
