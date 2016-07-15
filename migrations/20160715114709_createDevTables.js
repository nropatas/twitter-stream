'use strict';

exports.up = function(knex) {
    return knex.schema
        .createTable('tweets', (table) => {
            table.increments();
            table.string('tweet_id');
            table.string('username');
            table.string('name');
            table.string('avatar');
            table.text('tweet');
            table.dateTime('time');
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('tweets');
};
