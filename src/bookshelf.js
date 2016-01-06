/**
 * Created by faide on 12/13/2015.
 */
const knex = require('knex');
const bookshelf = require('bookshelf');

require('../config');

const conn = bookshelf(knex({
  client: 'pg',
  connection: process.env.PG_CONNECT_STRING
}));

conn.plugin('registry');

module.exports = conn;
