'use strict';

const nconf = require('nconf');
const nodeEnv = process.env.NODE_ENV || 'developement';
const config = {
    development: {
        database: {
            client: 'pg',
            connection: {
                host: 'localhost',
                user: 'sam',
                database: 'twitter_stream_dev'
            }
        }
    }
};

nconf.argv()
    .env()
    .defaults({
        database: config[nodeEnv].database,
        PORT: 3000
    });

module.exports = nconf;
