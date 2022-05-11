export const setPlayers = (players) => {
    const stringPlayers = JSON.stringify(players);
    localStorage.setItem('smt-players', stringPlayers);
};

export const getPlayers = () => {
    const stringPlayers = localStorage.getItem('smt-players');

    if(!stringPlayers) {
        return [];
    }

    return JSON.parse(stringPlayers);
};

export const getPlayer = (playerId) => {
    const stringPlayers = localStorage.getItem('smt-players');

    if(!stringPlayers) {
        return null;
    }

    const players = JSON.parse(stringPlayers);
    const player = players.find(player => player.id === playerId);

    return player || null;
};

export const searchPlayers = (search) => {
    if(!search.trim()) {
        return getPlayers();
    }
    
    const players = getPlayers();
    const searchPlayers = players.filter(player => player.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
    
    return searchPlayers;
};
