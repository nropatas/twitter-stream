'use strict';

const nconf = require('nconf');
const nodeEnv = process.env.NODE_ENV || 'development';

nconf.argv()
    .env()
    .defaults({
        NODE_ENV: nodeEnv,
        PORT: 3000,
        TABLE_NAME: 'tweets',
        KEYWORD_TABLE_NAME: 'keywords',
        TWITTER_CONSUMER_KEY: '',
        TWITTER_CONSUMER_SECRET: '',
        TWITTER_ACCESS_TOKEN_KEY: '',
        TWITTER_ACCESS_TOKEN_SECRET: ''
    });

module.exports = nconf;
