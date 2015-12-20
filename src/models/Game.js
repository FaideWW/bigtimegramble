/**
 * Created by faide on 12/13/2015.
 */

import bookshelf from '../bookshelf';

const Game = bookshelf.model('Game', bookshelf.Model.extend({
  tableName: 'btg_game',
  away: () => this.belongsTo('Team', 'awayTeam'),
  home: () => this.belongsTo('Team', 'homeTeam'),
}));

export default Game;