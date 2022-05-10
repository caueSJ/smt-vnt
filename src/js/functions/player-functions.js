import { get, getInitialLetters } from '../utils';
import { getPlayers } from '../storage/player-storage';

export const loadPlayers = async (league) => {
    let players = getPlayers();

    if (players.length > 0) {
        return players;
    }

    players = [];
    
    const response = await get(`players?league=${league.league.id}&season=${league.seasons[0].year}`);

    response.response.forEach(data => {
        players.push({
            id: data.player.id, 
            name: data.player.name, 
            nationality: data.player.nationality, 
            age: data.player.age, 
            photo: data.player.photo,
        });
    });

    return players;
};

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
    const players = getPlayers();
    const playersId = Object.keys(picks);

    playersId.forEach(playerId => {
        const player = players.find(player => player.id === +playerId);
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
