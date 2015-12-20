/**
 * Created by faide on 12/13/2015.
 */

import bookshelf from '../bookshelf';
import {fetchDivisionsAndTeams} from '../scraper';
import Division from '../models/Division';
import Team from '../models/Team';

fetchDivisionsAndTeams().then((divisions) => {
  return bookshelf.transaction((t) => {

    return Promise.all(Object.keys(divisions).map((divisionName) => {
      return new Division({ name: divisionName })
        .save(null, {transacting: t})
        .tap((model) => {
          return Promise.all(divisions[divisionName].map((team) => {
            return new Team(team).save({ 'divisionID': model.id }, {transacting: t});
          }));
        });
    }));
  });
}).then((division) => {
  console.log(division.related('teams').pluck('teamName'));
}).catch((err) => {
  console.error(err);
});

//for (let divisionName in divisions) {
//
//  return new
//
//  const teams = divisions[divisionName].map((team) => `${team.location} ${team.teamName}`);
//  console.log(`${divisionName}: ${teams.join(', ')}`);
//}