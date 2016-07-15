'use strict';

const nconf = require('nconf');
const nodeEnv = process.env.NODE_ENV || 'developement';

nconf.argv()
    .env()
    .defaults({
        NODE_ENV: nodeEnv,
        PORT: 3000
    });

module.exports = nconf;
