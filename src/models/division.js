/**
 * Created by faide on 12/13/2015.
 */

import bookshelf from '../bookshelf';

const Division = bookshelf.model('Division', bookshelf.Model.extend({
  tableName: 'btg_division',
  teams: () => this.hasMany('Team', 'divisionID')
}));

export default Division;