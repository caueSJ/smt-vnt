import './global';

import { getTeams } from './storage/team-storage';
import { listTeams, listTop5, listStatistics } from './functions/home-page-functions';

window.addEventListener('resourcesLoaded', function(event) {
    const teams = getTeams();

    listTeams(teams);
    listTop5(teams);
    listStatistics(teams);
});
