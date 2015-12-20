/**
 * Created by faide on 12/13/2015.
 */

import bookshelf from '../bookshelf';

const Statistic = bookshelf.model('Statistic', bookshelf.Model.extend({
  tableName: 'btg_statistic',
  record: () => this.belongsTo('Record', 'recordID')
}));

export default Statistic;