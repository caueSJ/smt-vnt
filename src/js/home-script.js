import './global.js';

import { getTeams } from './storage/team-storage';
import { listTeams, listTop5, listStatistics } from './functions/home-page-functions.js';

window.addEventListener('resourcesLoaded', function(event) {
    const teams = getTeams();

    listTeams(teams);
    listTop5(teams);
    listStatistics(teams);
});
