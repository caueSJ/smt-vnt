// Import generic components
import '../components/Header/Header';
import '../components/Footer/Footer';

import { loadPlayers } from './functions/player-functions';
import { loadTeams } from './functions/team-functions';
import { setLeague } from './storage/league-storage';
import { setPlayers } from './storage/player-storage';
import { setTeams } from './storage/team-storage';
import { loadLeague } from './functions/league-functions';

window.addEventListener('load', async (event) => {
    const league = await loadLeague();
    const playerData = await loadPlayers(league);
    const teams = await loadTeams(league, playerData.playersTeam);

    setLeague(league);
    setPlayers(playerData.players);
    setTeams(teams);

    document.querySelector('.loading').remove();

    const resourcesLoaded = new CustomEvent('resourcesLoaded');
    window.dispatchEvent(resourcesLoaded);
});