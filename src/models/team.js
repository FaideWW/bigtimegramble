/**
 * Created by faide on 12/13/2015.
 */

import bookshelf from '../bookshelf';

const Team = bookshelf.model('Team', bookshelf.Model.extend({
  tableName: 'btg_team',
  players: this.hasMany('Player'),
  division: () => this.belongsTo('Division', 'divisionID'),
  seasonRecord: () => this.belongsTo('Record', 'recordID'),
}));

export default Team;