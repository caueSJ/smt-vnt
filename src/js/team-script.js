import './global';
import '../components/ChoosePlayer/ChoosePlayer';
import '../components/Tag/Tag';

import { getUrlParams } from './utils/index';
import { getTeam } from './storage/team-storage';
import { addPageEvents, loadTeamData, updatePageTitle } from './functions/team-page-functions';
import { callSearch } from './functions/team-page-squad-functions';

window.addEventListener('resourcesLoaded', async (event) => {
    const params =  getUrlParams();

    if (params.id) {
        updatePageTitle('edit');

        const team = getTeam(+params.id);
        loadTeamData(team);
    } else {
        updatePageTitle('create');
    }
    
    addPageEvents();
    callSearch();
});
