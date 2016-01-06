/**
 * Created by faide on 12/13/2015.
 */

const bookshelf = require('../bookshelf');

const Record = bookshelf.model('Record', bookshelf.Model.extend({
  tableName: 'btg_record',
  idAttribute: 'recordid',
}));

module.exports = Record;