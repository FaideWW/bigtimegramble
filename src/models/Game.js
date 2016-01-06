/**
 * Created by faide on 12/13/2015.
 */

const bookshelf = require('../bookshelf');

const Game = bookshelf.model('Game', bookshelf.Model.extend({
  tableName: 'btg_game',
  idAttribute: 'gameid',
  away: () => this.belongsTo('Team', 'awayTeam'),
  home: () => this.belongsTo('Team', 'homeTeam'),
}));

module.exports = Game;