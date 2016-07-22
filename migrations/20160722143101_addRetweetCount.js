
exports.up = function(knex, Promise) {
    return knex.schema.table('tweets', (table) => {
        table.integer('retweet_count');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('tweets', (table) => {
        table.dropColumn('retweet_count');
    });
};
