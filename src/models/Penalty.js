/**
 * Created by faide on 12/13/2015.
 */

import bookshelf from '../bookshelf';

const Penalty = bookshelf.model('Penalty', bookshelf.Model.extend({
  tableName: 'btg_penalty',
  game: () => this.belongsTo('Game', 'gameID'),
  offender: () => this.belongsTo('Player', 'offender'),
}));

export default Penalty;