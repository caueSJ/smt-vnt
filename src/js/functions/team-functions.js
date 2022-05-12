import { ORDER_MAP, TEAM_TYPE } from '../constants';
import { get } from '../utils/index';
import { getPlayer } from '../storage/player-storage';
import { getTeams, setTeamBigId } from '../storage/team-storage';

/**
 * Get teams from a league from Football API
 * 
 * @param {Object} league League from Football API
 * @param {Array} playersTeam List of relationship between players and teams
 * @returns {Array} Teams from Football API
 */
export const loadTeams = async (league, playersTeam) => {
    let teams = getTeams();

    if (teams.length > 0) {
        return teams;
    }

    teams = [];

    const response = await get(`teams?league=${league.league.id}&season=${league.seasons[0].year}`);

    response.response.forEach(data => {
        const playersInTeam = playersTeam.map(pt => {
            if(pt.teamId === data.team.id) {
                return pt.playerId;
            }

            return null;
        }).filter(pt => pt !== null);

        const fakeWebsite = `http://${data.team.name.replaceAll(' ', '-').toLowerCase()}.com`; // The API do not give one
        
        teams.push({
            id: data.team.id, 
            name: data.team.name,
            description: `${data.team.name} Squad`,
            website: fakeWebsite,
            type: TEAM_TYPE.REAL,
            players: playersInTeam.slice(0,11),
            tags: [],
        });

        setTeamBigId(data.team.id);
    });

    return teams;
};

/**
 * Sort teams by field
 * 
 * @param {string} field Field to be sorted
 * @param {number} prevOrder Previous order applyed
 * @returns {Array} Teams sorted
 */
export const sortTeams = (field, prevOrder) => {
    const teams = getTeams();
    const newOrder = ORDER_MAP[prevOrder];

    const teamsInOrder = teams.slice().sort((a, b) => {
        if(newOrder === 0) {
            return 0; // Original order
        } else if(newOrder === 1) {
            return a[field].localeCompare(b[field]); // A - Z
        } else if(newOrder === -1) {
            return b[field].localeCompare(a[field]); // Z - A
        }
    });

    return teamsInOrder;
};

/**
 * Calculate teams average age
 * 
 * @param {Array} teams All teams
 * @returns {Array} Array with teams average age
 */
export const teamsAgeAvgs = (teams) => {
    const avgs = [];

    teams
        .filter(team => team.players.length > 0)
        .forEach(team => {
            let totalAge = 0;
            let numPlayers = 0;
            
            team.players.forEach(playerId => {
                const player = getPlayer(playerId);
                totalAge += player.age;
                numPlayers++;
            });

            const avg = (totalAge / numPlayers).toLocaleString('en-US', { maximumFractionDigits: 1 });
            avgs.push({
                team: {
                    id: team.id,
                    name: team.name,
                },
                avg,
            });
        });

    return avgs;
};
