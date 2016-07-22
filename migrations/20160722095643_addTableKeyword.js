
exports.up = function(knex, Promise) {
    return knex.schema.createTable('keywords', (table) => {
        table.increments();
        table.string('keyword');
        table.timestamp('time');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable('keywords');
};
