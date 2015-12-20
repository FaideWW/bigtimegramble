/**
 * Created by faide on 12/13/2015.
 */

import bookshelf from '../bookshelf';

const Goal = bookshelf.model('Goal', bookshelf.Model.extend({
  tableName: 'btg_goal',
  game: () => this.belongsTo('Game', 'gameID'),
  scorer: () => this.belongsTo('Player', 'scorer'),
  firstAssist: () => this.belongsTo('Player', 'assistant1'),
  secondAssist: () => this.belongsTo('Player', 'assistant2')
}));

export default Goal;