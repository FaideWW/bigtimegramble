/**
 * Created by faide on 12/13/2015.
 */
const bookshelf = require('../bookshelf');

const Player = bookshelf.model('Player', bookshelf.Model.extend({
  tableName: 'btg_player',
  team: () => this.belongsTo('Team', 'teamid'),
  seasonStats: () => this.belongsTo('Statistic', 'seasonstats'),
  overallStats: () => this.belongsTo('Statistic', 'overallStats')
}));

module.exports = Player;