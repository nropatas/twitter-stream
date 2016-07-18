'use strict';

const model = require('../models/index');

function index() {}

index.prototype.fetch = (req, res) => {
    if (req.query.track) {
        model.fetch(req.query.track);
    } else {
        throw new Error('track was not specified');
    }
};

module.exports = new index();
