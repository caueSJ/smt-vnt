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

export const getTeamBigId = () => {
    const bigId = localStorage.getItem('smt-teams-big-id');

    if(!bigId) {
        return 0;
    }

    return +bigId;
};

export const setTeamBigId = (teamId) => {
    const bigId = getTeamBigId();

    if(teamId > bigId) {
        localStorage.setItem('smt-teams-big-id', teamId);
    }
};

export const generateTeamNewId = () => {
    const bigId = getTeamBigId();
    const newBigId = bigId + 1;

    setTeamBigId(newBigId);

    return newBigId;
};

export const addTeam = (team) => {
    const teamId = generateTeamNewId();

    team.id = teamId;

    const teams = getTeams();
    const newTeams = [
        ...teams,
        team,
    ];

    setTeams(newTeams);

    return teamId;
};

export const editTeam = (teamEdit) => {
    const teams = getTeams();
    const teamsWithoutEdit = teams.filter(team => team.id !== teamEdit.id);
    const newTeams = [
        ...teamsWithoutEdit,
        teamEdit
    ];
    setTeams(newTeams);
};
