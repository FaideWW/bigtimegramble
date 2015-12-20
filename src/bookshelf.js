/**
 * Created by faide on 12/13/2015.
 */
import knex from 'knex';
import bookshelf from 'bookshelf';

import '../config';

bookshelf.plugin('registry');

export default bookshelf(knex({
  client: 'pg',
  connection: process.env.PG_CONNECT_STRING
}));