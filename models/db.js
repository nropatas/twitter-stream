'use strict';

const config = require('../config');
const knexfile = require('../knexfile');
const knex = require('knex')(knexfile[config.get('NODE_ENV')]);

module.exports = knex;
