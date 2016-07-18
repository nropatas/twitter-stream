'use strict';

const nconf = require('nconf');
const nodeEnv = process.env.NODE_ENV || 'development';

nconf.argv()
    .env()
    .defaults({
        NODE_ENV: nodeEnv,
        PORT: 3000,
        TABLE_NAME: 'tweets',
        TWITTER_CONSUMER_KEY: 'A61XsF3kIZRa3g8SEWa4j8rA9',
        TWITTER_CONSUMER_SECRET: '58dP59jpArcWzdGncG1N4VAdXooBJFKXxKhQ3mUPQu0VmmM7WR',
        TWITTER_ACCESS_TOKEN_KEY: '137725279-s3MIPFqG5KC5wVlkSylBrHDhHd86olyNnxNJIn82',
        TWITTER_ACCESS_TOKEN_SECRET: '3w2perh3qlEccmEwPxRKbAC7APm0x3mpG5UEPfjbQc3Uw'
    });

module.exports = nconf;
