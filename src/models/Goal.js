/**
 * Created by faide on 12/13/2015.
 */

const bookshelf = require('../bookshelf');

const Goal = bookshelf.model('Goal', bookshelf.Model.extend({
  tableName: 'btg_goal',
  idAttribute: 'goalid',
  game: () => this.belongsTo('Game', 'gameid'),
  scorer: () => this.belongsTo('Player', 'scorer'),
  firstAssist: () => this.belongsTo('Player', 'assistant1'),
  secondAssist: () => this.belongsTo('Player', 'assistant2')
}));

module.exports = Goal;