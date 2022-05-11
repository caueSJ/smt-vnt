import { FOOTBALL_API_URL, FOOTBALL_HEADERS } from '../constants';

export const getYear = () => {
    const date = new Date();
    return date.getFullYear();
};

export const getCapitalFirstLetter = (word) => {
  return word.charAt(0).toUpperCase();
};

export const getInitialLetters = (name) => {
    if (!name) {
        return '';
    }

    const nameSplited = name.split(' ');

    if(nameSplited.length === 1) {
      return getCapitalFirstLetter(nameSplited[0]);
    }

    return getCapitalFirstLetter(nameSplited[0]) + getCapitalFirstLetter(nameSplited[nameSplited.length - 1]);
};

/*
 * Based on https://stackoverflow.com/questions/979975/get-the-values-from-the-get-parameters-javascript
 */
export const parseQueryString = (query) => {
    const vars = query.split('&');
    const query_string = {};
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      const key = decodeURIComponent(pair.shift());
      const value = decodeURIComponent(pair.join('='));

      // If first entry with this name
      if (typeof query_string[key] === 'undefined') {
        query_string[key] = value;
        // If second entry with this name
      } else if (typeof query_string[key] === 'string') {
        const arr = [query_string[key], value];
        query_string[key] = arr;
        // If third or later entry with this name
      } else {
        query_string[key].push(value);
      }
    }
    return query_string;
};

export const getUrlParams = () => {
  const urlSearch =  window.location.search.slice(1); // Remove ? at the start of the string

  if(urlSearch) {
    const params = parseQueryString(urlSearch);
    return params;
  }

  return {};
};

export const get = (endpoint) => {
  return $.ajax({
    url: `${FOOTBALL_API_URL}/${endpoint}`,
    method: 'GET',
    timeout: 0,
    headers: FOOTBALL_HEADERS,
  });
};
