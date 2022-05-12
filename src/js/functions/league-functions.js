import { get } from '../utils';
import { getLeague } from '../storage/league-storage';

/**
 * Get last league from Brazil from Football API
 * 
 * @returns {Object} League from Football API
 */
export const loadLeague = async () => {
    let league = getLeague();

    if(league) {
        return league;
    }

    const response = await get('leagues?country=Brazil&last=1');
    league = response.response[0];

    return league;
};