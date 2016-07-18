'use strict';

const model = require('../models/index');

function index() {}

index.prototype.showFeed = (req, res) => {
    if (req.query.track) {
        model.getTweetsFromDb(req.query.track)
            .then((rows) => {
                res.render('index', {
                    data: rows
                });
            })
            .catch(console.error);
    } else {
        throw new Error('track was not specified');
    }
};

index.prototype.fetch = (req) => {
    if (req.query.track) {
        model.fetch(req.query.track);
    } else {
        throw new Error('track was not specified');
    }
};

module.exports = new index();
