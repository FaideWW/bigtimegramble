/**
 * Created by faide on 12/13/2015.
 */
import bookshelf from '../bookshelf';

const Player = bookshelf.model('Player', bookshelf.Model.extend({
  tableName: 'btg_player',
  team: () => this.belongsTo('Team', 'teamID'),
  seasonStats: () => this.belongsTo('Statistic', 'seasonStats'),
  overallStats: () => this.belongsTo('Statistic', 'overallStats')
}));

export default Player;