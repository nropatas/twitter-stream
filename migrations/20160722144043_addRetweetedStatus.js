
exports.up = function(knex, Promise) {
    return knex.schema.table('tweets', (table) => {
        table.string('original_tweet');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('tweets', (table) => {
        table.dropColumn('original_tweet');
    });
};
