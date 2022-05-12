/**
 * Set Teams inside local storage
 * 
 * @param {Array} teams Teams from Football API
 */
export const setTeams = (teams) => {
    const stringTeams = JSON.stringify(teams);
    localStorage.setItem('smt-teams', stringTeams);
};

/**
 * Get teams from local storage
 * 
 * @returns {Array} Teams
 */
export const getTeams = () => {
    const stringTeams = localStorage.getItem('smt-teams');

    if(!stringTeams) {
        return [];
    }

    return JSON.parse(stringTeams);
};

/**
 * Get single team from local storage
 * 
 * @param {number} teamId Team ID
 * @returns {Object|null} Team or null
 */
export const getTeam = (teamId) => {
    const stringTeams = localStorage.getItem('smt-teams');

    if(!stringTeams) {
        return null;
    }

    const teams = JSON.parse(stringTeams);
    const team = teams.find(team => team.id === teamId);

    return team || null;
};

/**
 * Remove team from local storage
 * 
 * @param {number} teamId Team ID
 */
export const removeTeam = (teamId) => {
    const teams = getTeams();
    const newTeams = teams.filter(team => team.id !== teamId);
    setTeams(newTeams);
};

/**
 * Return current big team ID
 * 
 * @returns {number} Big ID
 */
export const getTeamBigId = () => {
    const bigId = localStorage.getItem('smt-teams-big-id');

    if(!bigId) {
        return 0;
    }

    return +bigId;
};

/**
 * Update Big ID if needed
 * 
 * @param {number} teamId Team ID
 */
export const setTeamBigId = (teamId) => {
    const bigId = getTeamBigId();

    if(teamId > bigId) {
        localStorage.setItem('smt-teams-big-id', teamId);
    }
};

/**
 * Generate new Team ID
 * 
 * @returns {number} Team ID
 */
export const generateTeamNewId = () => {
    const bigId = getTeamBigId();
    const newBigId = bigId + 1;

    setTeamBigId(newBigId);

    return newBigId;
};

/**
 * Add team to local storage
 * @param {Object} team Team
 * @returns {number} New team ID
 */
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

/**
 * Update team data
 * 
 * @param {Object} teamEdit Team
 */
export const editTeam = (teamEdit) => {
    const teams = getTeams();
    const teamsWithoutEdit = teams.filter(team => team.id !== teamEdit.id);
    const newTeams = [
        ...teamsWithoutEdit,
        teamEdit
    ];
    setTeams(newTeams);
};
