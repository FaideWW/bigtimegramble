/**
 * Created by faide on 12/13/2015.
 */

const bookshelf = require('../bookshelf');
const fetchDivisionsAndTeams = require('../scraper').fetchDivisionsAndTeams;
const Division = require('../models/Division');
const Team = require('../models/Team');

fetchDivisionsAndTeams().then((divisions) => {
  return bookshelf.transaction((t) => {

    return Promise.all(Object.keys(divisions).map((divisionName) => {
      return Division.where({name: divisionName}).fetch()
        .then((division) => {
          division = division || new Division({name: divisionName});

          return division
            .save(null, {transacting: t})
            .tap((model) => {
              return Promise.all(divisions[divisionName].map((teamData) => {
                teamData.divisionid = model.get('divisionid');
                return Team.where({espnid: teamData.espnid}).fetch()
                  .then((team) => {
                    team = team || new Team(teamData);
                    return team.save({divisionid: model.get('divisionid')}, {transacting: t});
                  });
              }));
            })
            .catch((e) => {
              console.log(e);
            });
        });
    }));
  });
}).then((divisions) => {
  divisions.forEach((division) => console.log(division.get('name'), division.related('teams').pluck('teamname')));
}).catch((err) => {
  console.error(err);
});

