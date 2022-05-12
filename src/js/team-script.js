import './global.js';
import '../components/ChoosePlayer/ChoosePlayer';

import { getUrlParams } from './utils/index.js';
import { getTeam } from './storage/team-storage';
import { addPageEvents, loadTeamData, initSearch } from './functions/team-page-functions.js';

window.addEventListener('resourcesLoaded', async (event) => {
    const params =  getUrlParams();

    if (params.id) {
        const team = getTeam(+params.id);
        loadTeamData(team);
    }
    
    addPageEvents();
    initSearch();
});
