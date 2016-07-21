'use strict';

function images() {}

const db = require('./db');
const config = require('../config');

images.prototype.getImages = () => {
    return new Promise((fulfill, reject) => {
        let imgs = [];

        db(config.get('TABLE_NAME')).whereNotNull('media')
            .orderBy('id', 'desc')
            .then((rows) => {
                rows.forEach((row) => {
                    row.media.forEach((media) => {
                        if (media.type === 'photo') {
                            imgs.push({
                                img_url: media.media_url,
                                tweet_id: row.tweet_id
                            });
                        }
                    });
                });

                fulfill(imgs);
            })
            .catch(reject);
    });
};

module.exports = new images();
