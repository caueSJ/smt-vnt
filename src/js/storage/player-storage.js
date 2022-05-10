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

export const searchPlayers = (search) => {
    if(!search.trim()) {
        return [];
    }
    
    const players = getPlayers();
    const searchPlayers = players.filter(player => player.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
    
    return searchPlayers;
};
