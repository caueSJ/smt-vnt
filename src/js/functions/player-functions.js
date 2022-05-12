import { get, getInitialLetters } from '../utils';
import { getPlayer, getPlayers } from '../storage/player-storage';

/**
 * Load players from Football API
 * 
 * @param {Object} league League object from Football API
 * @returns {Object} Object with two arrays: players and playersTeam (Relationship between players and team)
 */
export const loadPlayers = async (league) => {
    let players = getPlayers();

    if (players.length > 0) {
        return {
            players,
            playersTeam: [],
        };
    }

    players = [];
    const playersTeam = [];

    const response = await loadPlayersData(league);

    response.forEach(data => {
        players.push({
            id: data.player.id, 
            name: data.player.name, 
            nationality: data.player.nationality, 
            age: data.player.age, 
            photo: data.player.photo,
        });
        playersTeam.push({
            playerId: data.player.id,
            teamId: data.statistics[0].team.id,
        });
    });

    return {
        players,
        playersTeam,
    };
};

/**
 * Get players from Football API recursively
 * Based on https://www.api-football.com/tutorials/4/how-to-get-all-teams-and-players-from-a-league-id
 * 
 * @param {Object} league League object from Football API
 * @param {number} page Current page
 * @param {Array} playersData Players from Football API
 * @returns {Array} Players from Football API
 */
const loadPlayersData = async (league, page = 1, playersData = []) => {
    const data = await loadPlayersPerPage(league, page);
    playersData = playersData.concat(data.response);

    if(data.paging.current < data.paging.total) {
        playersData = await loadPlayersData(league, data.paging.current + 1, playersData);
    }

    return playersData;
};

/**
 * Get players from league and page
 * 
 * @param {Object} league League object from Football API
 * @param {number} page Current page
 * @returns {Promise} Promise with Football API response
 */
export const loadPlayersPerPage = async (league, page) => {
    const response = await get(`players?league=${league.league.id}&season=${league.seasons[0].year}&page=${page}`);
    return response;
};

/**
 * Return picked players with picks number and pick rate
 * 
 * @param {Array} teams All Teams
 * @returns {Array} Players with picks number and pick rate
 */
export const playersPicks = (teams) => {
    const picks = {};

    teams.forEach(team => {
        team.players.forEach(playerId => {
            if(!picks.hasOwnProperty(playerId)) {
                picks[playerId] = 0;
            }

            picks[playerId]++;
        });
    });

    const picksArray = [];
    const playersId = Object.keys(picks);

    playersId.forEach(playerId => {
        const player = getPlayer(+playerId);
        const pickRate = parseInt(picks[playerId] / teams.length * 100) + '%';

        picksArray.push({
            player: {
                name: player.name,
                initials: getInitialLetters(player.name),
                photo: player.photo,
            },
            picks: picks[playerId],
            percentage: pickRate,
        });
    });

    return picksArray;
};
