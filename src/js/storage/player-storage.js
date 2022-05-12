/**
 * Set players inside local storage
 * 
 * @param {Array} players Players from Football API
 */
export const setPlayers = (players) => {
    const stringPlayers = JSON.stringify(players);
    localStorage.setItem('smt-players', stringPlayers);
};

/**
 * Get players from local storage
 * 
 * @returns {Array} Players
 */
export const getPlayers = () => {
    const stringPlayers = localStorage.getItem('smt-players');

    if(!stringPlayers) {
        return [];
    }

    return JSON.parse(stringPlayers);
};

/**
 * Get single player from local storage
 * 
 * @param {number} playerId Player ID
 * @returns {Object|null} Player or null
 */
export const getPlayer = (playerId) => {
    const stringPlayers = localStorage.getItem('smt-players');

    if(!stringPlayers) {
        return null;
    }

    const players = JSON.parse(stringPlayers);
    const player = players.find(player => player.id === playerId);

    return player || null;
};

/**
 * Search players inside local storage
 * 
 * @param {string} search Search criteria
 * @returns 
 */
export const searchPlayers = (search) => {
    if(!search.trim()) {
        return getPlayers();
    }
    
    const players = getPlayers();
    const searchPlayers = players.filter(player => player.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
    
    return searchPlayers;
};
