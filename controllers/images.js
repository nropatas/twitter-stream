'use strict';

const model = require('../models/images');

function images() {}

images.prototype.showImages = (req, res) => {
    model.getImages()
        .then((imgs) => {
            res.render('images', {
                data: imgs
            });
        })
        .catch(console.error);
};

module.exports = new images();
