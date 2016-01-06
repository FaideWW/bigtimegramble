/**
 * Created by faide on 12/13/2015.
 */

const bookshelf = require('../bookshelf');

const Statistic = bookshelf.model('Statistic', bookshelf.Model.extend({
  tableName: 'btg_statistic',
  idAttribute: 'statid',
  record: () => this.belongsTo('Record', 'recordID')
}));

module.exports = Statistic;