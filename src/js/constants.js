/**
 * Team table actions
 */
export const ACTIONS = {
    DELETE: 'delete',
    SHARE: 'share',
};

/**
 * Order map related to sort team table
 */
export const ORDER_MAP = {
    0: 1,
    1: -1,
    '-1': 0,
};

/**
 * Order icon related to sort team table
 */
export const ORDER_ICON = {
    0: 'fa-sort',
    1: 'fa-sort-up',
    '-1': 'fa-sort-down',
};

/**
 * Possible team types
 */
export const TEAM_TYPE = {
    REAL: 'real',
    FANTASY: 'fantasy',
};

/**
 * Football API URL
 */
export const FOOTBALL_API_URL = 'https://v3.football.api-sports.io';

/**
 * Football API headers
 */
export const FOOTBALL_HEADERS = {
    'x-rapidapi-key': '84be6e8e56c4c34d36cf2c3eb67325d9',
    'x-rapidapi-host': 'v3.football.api-sports.io'
};
