'use strict';

const model = require('../models/stats');

const numTopTweets = 10;

function stats() {}

stats.prototype.showStats = (req, res) => {
    let p1 = model.countUrls();
    let p2 = model.countHashtags();
    let p3 = model.allTweets();
    let p4 = model.TweetsWithImgs();
    let p5 = model.TweetsWithUrls();
    let p6 = model.topTweets(numTopTweets);
    let p7 = model.retweets();

    Promise.all([p1, p2, p3, p4, p5, p6, p7])
        .then((values) => {
            res.render('stats', {
                urlRanking: values[0],
                hashtagRanking: values[1],
                percentMedia: ((values[3] / values[2]) * 100).toFixed(2),
                percentUrls: ((values[4] / values[2]) * 100).toFixed(2),
                topTweets: [numTopTweets, values[5]],
                percentRetweets: ((values[6] / values[2]) * 100).toFixed(2)
            });
        })
        .catch(console.error);
};

module.exports = new stats();
