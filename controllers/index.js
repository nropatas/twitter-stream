'use strict';

const model = require('../models/index');

function index() {}

index.prototype.showFeed = (req, res) => {
    model.getTweetsFromDb()
        .then((rows) => {
            res.render('index', {
                data: rows
            });
        })
        .catch(console.error);
};

index.prototype.fetch = (req) => {
    if (req.query.track) {
        model.fetch(req.query.track);
    } else {
        throw new Error('track was not specified');
    }
};

module.exports = new index();
