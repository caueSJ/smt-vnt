import './global.js';

import { parseQueryString } from './utils/index.js';
import { getTeam } from './storage/team-storage';
import { addPageEvents, loadTeamData } from './functions/team-page-functions.js';

window.addEventListener('resourcesLoaded', function(event) {
    const urlSearch =  window.location.search.slice(1); // Remove ? at the start of the string

    if(urlSearch) {
        const params = parseQueryString(urlSearch);
        const team = getTeam(+params.id);

        loadTeamData(team);
    }
    
    addPageEvents();
});
