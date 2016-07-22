'use strict';

function stats() {}

const db = require('./db');
const config = require('../config');

function sortMap(map) {
    let orderedKeys = Object.keys(map)
        .sort((keyA, keyB) => {
            return map.get(keyA) - map.get(keyB);
        });

    return orderedKeys;
}

stats.prototype.countUrls = () => {
    return new Promise((fulfill, reject) => {
        db(config.get('TABLE_NAME')).whereNotNull('urls')
            .then((rows) => {
                let urls = new Map();

                rows.forEach((row) => {
                    row.urls.forEach((url) => {
                        let key = url.expanded_url;

                        if (urls.has(key)) {
                            urls.set(key, urls.get(key) + 1);
                        } else {
                            urls.set(key, 1);
                        }
                    });
                });

                fulfill([urls, sortMap(urls)]);
            })
            .catch(reject);
    });
};

stats.prototype.countHashtags = () => {
    return new Promise((fulfill, reject) => {
        db(config.get('TABLE_NAME')).whereNotNull('hashtags')
            .then((rows) => {
                let tags = new Map();

                rows.forEach((row) => {
                    row.hashtags.forEach((tag) => {
                        let key = tag.text;

                        if (tags.has(key)) {
                            tags.set(key, tags.get(key) + 1);
                        } else {
                            tags.set(key, 1);
                        }
                    });
                });

                fulfill([tags, sortMap(tags)]);
            })
            .catch(reject);
    });
};

stats.prototype.allTweets = () => {
    return new Promise((fulfill, reject) => {
        db(config.get('TABLE_NAME')).count('id as count')
            .then((rows) => {
                let allTweets = parseInt(rows[0].count, 10);
                fulfill(allTweets);
            })
            .catch(reject);
    });
};

stats.prototype.TweetsWithImgs = () => {
    return new Promise((fulfill, reject) => {
        db(config.get('TABLE_NAME')).count('id as count')
            .whereNotNull('media')
            .then((rows) => {
                let withImgs = parseInt(rows[0].count, 10);
                fulfill(withImgs);
            })
            .catch(reject);
    });
};

stats.prototype.TweetsWithUrls = () => {
    return new Promise((fulfill, reject) => {
        db(config.get('TABLE_NAME')).count('id as count')
            .whereNotNull('urls')
            .then((rows) => {
                let withUrls = parseInt(rows[0].count, 10);
                fulfill(withUrls);
            })
            .catch(reject);
    });
};

module.exports = new stats();
