'use strict';

exports.up = function(knex) {
    return knex.schema
        .createTable('tweets', (table) => {
            table.increments();
            table.string('username');
            table.string('name');
            table.string('avatar');
            table.string('text');
            table.json('hashtags');
            table.json('urls');
            table.json('mentions');
            table.json('media');
            table.json('coordinates');
            table.timestamp('time');
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('tweets');
};
