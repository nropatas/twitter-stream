'use strict';

const model = require('../models/stats');

function stats() {}

stats.prototype.showStats = (req, res) => {
    let p1 = model.countUrls();
    let p2 = model.countHashtags();
    let p3 = model.allTweets();
    let p4 = model.TweetsWithImgs();
    let p5 = model.TweetsWithUrls();

    Promise.all([p1, p2, p3, p4, p5])
        .then((values) => {
            res.render('stats', {
                percentMedia: ((values[3] / values[2]) * 100).toFixed(2),
                percentUrls: ((values[4] / values[2]) * 100).toFixed(2),
                urlRanking: values[0],
                hashtagRanking: values[1]
            });
        })
        .catch(console.error);
};

module.exports = new stats();
