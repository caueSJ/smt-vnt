export const setTeams = (teams) => {
    const stringTeams = JSON.stringify(teams);
    localStorage.setItem('smt-teams', stringTeams);
};

export const getTeams = () => {
    const stringTeams = localStorage.getItem('smt-teams');

    if(!stringTeams) {
        return [];
    }

    return JSON.parse(stringTeams);
};

export const getTeam = (teamId) => {
    const stringTeams = localStorage.getItem('smt-teams');

    if(!stringTeams) {
        return null;
    }

    const teams = JSON.parse(stringTeams);
    const team = teams.find(team => team.id === teamId);

    return team || null;
};

export const removeTeam = (teamId) => {
    const teams = getTeams();
    const newTeams = teams.filter(team => team.id !== teamId);
    setTeams(newTeams);
};
