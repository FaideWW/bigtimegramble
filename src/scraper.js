/**
 * Scrapes ESPN for team/player/game data
 *
 * Created by faide on 12/12/2015.
 */

const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');

/**
 * Fetches game data for a given game ID
 * @param gameID
 */
const getGameData = (gameID) => new Promise((resolve, reject) => {
  request(`http://espn.go.com/nhl/boxscore?gameId=${gameID}`, (err, res, body) => {

    const $ = cheerio.load(body);
    const $state = $('.game-state');
    const $matchup = $('.matchup').children();

    const $startTime = $('.game-time-location');
    const startTime = moment.tz($startTime.children().first().text(), 'h:m A ?, MMMM D, YYYY', 'America/Toronto');

    const gameData = {
      espnID: gameID,
      awayTeam: $matchup.find('.away .team-info a').text(),
      homeTeam: $matchup.find('.home .team-info a').text(),
      startTime: startTime.toISOString(),
    };

    if ($state.parent().hasClass('status-pregame')) {

    } else if ($state.parent().hasClass('status-final')) {
      const extraTime = $state.find('#status-bar-clock').text();
      if (extraTime.includes('OT')) gameData.period = 'OT';
      if (extraTime.includes('SO')) gameData.period = 'SO';
      gameData.isFinal = true;

    } else if ($state.parent().hasClass('status-live')) {
      // status-bar-period: 1st
      // status-bar-clock: 5:32

      // status-bar-period: End
      // status-bar-clock: 2nd
      const timePlayed = $state.find('#status-bar-clock').text().match(/(\d):(\d)/);
      gameData.timeRemaining = parseInt(timePlayed[1]) * 60 + parseInt(timePlayed[2]);
    }

    resolve(gameData);
  });
});

const getDaysGames = (dateString) => new Promise((resolve, reject) => {
  request(`http://espn.go.com/nhl/scoreboard?date=${dateString}`, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      reject(err.message);
    }

    const $ = cheerio.load(body);
    const gameIDs = $('.mod-scorebox').map((index, element) => {
      const elID = $(element).attr('id').match(/(\d+)-gamebox/);
      if (!elID) {
        reject('Invalid element found', element);
      }

      return elID[1];
    });
    resolve(gameIDs.get());
  });
});

const fetchDivisionsAndTeams = () => new Promise((resolve, reject) => {
  request(`http://espn.go.com/nhl/teams`, (err, res, body) => {
    const $ = cheerio.load(body);
    const divisions = $('.mod-teams-list-medium').map((index, element) => {
      const divisionName = $(element).children('.stathead').text();
      const $teams = $(element).find('.mod-content li');

      return {
        name: divisionName.replace(' Division', ''),
        $teams
      };
    }).get();
    resolve({$, divisions});
  });
}).then((args) => {

  // destructuring PLS
  const $ = args.$;
  const divisions = args.divisions;

  const divisionObj = {};
  divisions.forEach((division) => {
    divisionObj[division.name] = [];
    division.$teams.each((index, element) => {
      const $teamData = $(element).find('a.bi').first();
      const teamURL = $teamData.attr('href');
      const fullTeamName = $teamData.text();
      const matchTeamName = $(element).find('.entry-title').text().match(/ESPN: (.+)/);

      if (matchTeamName === null) throw new Error('Could not find team name');

      const teamName = matchTeamName[1];
      const teamLocation = fullTeamName.replace(` ${teamName}`, '');
      const matchClubID = teamURL.match(/http:\/\/espn\.go\.com\/nhl\/team\/_\/name\/(.+)\/.+/);

      if (matchClubID === null) return reject('Could not find club ID');

      const clubID = matchClubID[1];

      // all column names in pg are lowercase
      const team = {
        espnid: clubID,
        location: teamLocation,
        teamname: teamName,
      };
      divisionObj[division.name].push(team);
    });
  });
  return divisionObj;
})
  .catch((err) => {
  console.error(err);
});

const getTodaysGames = () => {
  const currentDate = moment();
  console.log(`Fetching games for ${currentDate.format('dddd MMM D, YYYY')}`);
  getDaysGames(currentDate.format('YYYYMMDD')).then((gameIDs) => {
    const loadGames = gameIDs.map(getGameData);
    return Promise.all(loadGames);
  }).then((games) => {
      console.log(games);
    })
    .catch((err) => console.error(err));
};




module.exports = {
  getTodaysGames,
  fetchDivisionsAndTeams
};

