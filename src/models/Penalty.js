/**
 * Created by faide on 12/13/2015.
 */

const bookshelf = require('../bookshelf');

const Penalty = bookshelf.model('Penalty', bookshelf.Model.extend({
  tableName: 'btg_penalty',
  idAttribute: 'penaltyid',
  game: () => this.belongsTo('Game', 'gameid'),
  offender: () => this.belongsTo('Player', 'offender'),
}));

module.exports = Penalty;