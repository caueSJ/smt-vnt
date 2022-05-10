import { get } from '../utils';
import { getLeague } from '../storage/league-storage';

export const loadLeague = async () => {
    let league = getLeague();

    if(league) {
        return league;
    }

    const response = await get('leagues?country=Brazil&last=1');
    league = response.response[0];

    return league;
};