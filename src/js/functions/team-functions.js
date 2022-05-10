import { ORDER_ICON, ORDER_MAP, TEAM_TYPE } from '../constants.js';
import { get } from '../utils/index.js';
import { listTeams } from './home-page-functions.js';
import { getPlayers } from '../storage/player-storage';
import { getTeams } from '../storage/team-storage';

export const loadTeams = async (league) => {
    let teams = getTeams();

    if (teams.length > 0) {
        return teams;
    }

    teams = [];

    const response = await get(`teams?league=${league.league.id}&season=${league.seasons[0].year}`);

    response.response.forEach(data => {
        teams.push({
            id: data.team.id, 
            name: data.team.name,
            description: '',
            website: '',
            type: TEAM_TYPE.REAL,
            players: [],
            tags: [],
        });
    });

    return teams;
};

export const sortTeams = (event) => {
    const teams = getTeams();
    const target = event.currentTarget;
    const field = target.dataset.sort;
    const prevOrder = target.dataset.order;
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

    listTeams(teamsInOrder);

    target.dataset.order = newOrder;
    target.classList.remove(ORDER_ICON[prevOrder]);
    target.classList.add(ORDER_ICON[newOrder]);
};

export const teamsAgeAvgs = (teams) => {
    const avgs = [];
    const players = getPlayers();

    teams
        .filter(team => team.players.length > 0)
        .forEach(team => {
            let totalAge = 0;
            let numPlayers = 0;
            
            team.players.forEach(playerId => {
                const player = players.find(player => player.id === playerId);
                totalAge += player.age;
                numPlayers++;
            });

            const avg = totalAge / numPlayers;
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
