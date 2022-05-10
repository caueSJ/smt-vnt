export const getLeague = () => {
    const stringLeague = localStorage.getItem('smt-league');

    if(!stringLeague) {
        return null;
    }

    return JSON.parse(stringLeague);
};

export const setLeague = (league) => {
    const stringLeague = JSON.stringify(league);
    localStorage.setItem('smt-league', stringLeague);
};
