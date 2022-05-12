/**
 * Get league from local storage
 * 
 * @returns {Object}
 */
export const getLeague = () => {
    const stringLeague = localStorage.getItem('smt-league');

    if(!stringLeague) {
        return null;
    }

    return JSON.parse(stringLeague);
};

/**
 * Set league inside local storage
 * 
 * @param {Object} league League from Football API
 */
export const setLeague = (league) => {
    const stringLeague = JSON.stringify(league);
    localStorage.setItem('smt-league', stringLeague);
};
