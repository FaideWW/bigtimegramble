/**
 * Created by faide on 12/13/2015.
 */

import bookshelf from '../bookshelf';

const Record = bookshelf.model('Record', bookshelf.Model.extend({
  tableName: 'btg_record',

}));

export default Record;