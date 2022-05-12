import { ACTIONS, ORDER_ICON, ORDER_MAP } from '../constants';
import { playersPicks } from './player-functions';
import { sortTeams, teamsAgeAvgs } from './team-functions';
import { removeTeam } from '../storage/team-storage';

/**
 * Delete team from HTML and localStorage
 * 
 * @param {Event} event 
 */
export const deleteTeam = (event) => {
    const teamId = event.currentTarget.dataset.id;
    document.querySelector(`#teamsTable tbody tr[data-id="${teamId}"]`).remove();
    removeTeam(+teamId);
};

/**
 * Sort teams from HTML table
 * 
 * @param {Event} event 
 */
export const sortTable = (event) => {
    const target = event.currentTarget;
    const sort = target.dataset.sort;
    const prevOrder = target.dataset.order;
    const newOrder = ORDER_MAP[prevOrder];
    const teamsInOrder = sortTeams(sort, prevOrder);

    listTeams(teamsInOrder);

    target.dataset.order = newOrder;
    target.classList.remove(ORDER_ICON[prevOrder]);
    target.classList.add(ORDER_ICON[newOrder]);
    
    const otherSort = document.querySelector(`[data-sort]:not([data-sort="${sort}"])`);
    otherSort.classList.remove(ORDER_ICON[1], ORDER_ICON[-1]);
    otherSort.classList.add(ORDER_ICON[0]);
};

/**
 * Add events to teams HTML table
 */
export const addTeamTableEvents = () => {
    document.querySelectorAll(`[data-action=${ACTIONS.DELETE}]`).forEach(e => {
        e.addEventListener('click', deleteTeam);
    });

    document.querySelectorAll(`[data-sort]`).forEach(e => {
        e.addEventListener('click', sortTable);
    });
};

/**
 * List teams inside HTML table and add events
 * 
 * @param {Array} teams All Teams
 */
export const listTeams = (teams) => {
    let teamsHTML = '';

    teams.forEach(team => {
        teamsHTML += `
            <tr data-id="${team.id}">
                <td>${team.name}</td>
                <td>${team.description}</td>
                <td>
                    <div class="action-icons">
                        <i class="fa-solid fa-trash" alt="Delete" title="Delete" data-action="${ACTIONS.DELETE}" data-id="${team.id}"></i>
                        <i class="fa-solid fa-share-nodes" alt="Share" title="Share" data-action="${ACTIONS.SHARE}" data-id="${team.id}"></i>
                        <a href="/team.html?id=${team.id}">
                            <i class="fa-solid fa-pen" alt="Edit" title="Edit"></i>
                        </a>
                    </div>
                </td>
            </tr>
        `;
    });

    document.querySelector('#teamsTable tbody').innerHTML = teamsHTML;

    addTeamTableEvents();
};

/**
 * List 5 averages inside list
 * 
 * @param {string} listId ID from ul used to render list
 * @param {Array} avgs Array with age averages
 */
export const listAvg = (listId, avgs) => {
    let avgHTML = '';

    for(let i = 0; i < 5; i++) {
        const avg = avgs[i];
        avgHTML += `<li title="${avg.team.name}"><a href="/team.html?id=${avg.team.id}"><span>${avg.team.name}</span> <b>${avg.avg}</b></a></li>`;
    }

    document.querySelector(`#${listId} ul`).innerHTML = avgHTML;
};

/**
 * List data inside TOP 5 section
 * 
 * @param {Array} teams All teams
 */
export const listTop5 = (teams) => {
    const avgs = teamsAgeAvgs(teams);

    if(avgs.length > 0) {
        const avgsHighToLow = avgs.slice().sort((a, b) => {
            return b.avg - a.avg;
        });
        const avgsLowToHigh = avgs.slice().sort((a, b) => {
            return a.avg - b.avg;
        });
    
        listAvg('highAgeAvg', avgsHighToLow);
        listAvg('lowAgeAvg', avgsLowToHigh);
    }
};

/**
 * Update single statistic
 * 
 * @param {string} statId ID from statistic to be updated
 * @param {Object} info Statistic information
 */
export const updateStatistic = (statId, info) => {
    const stat = document.querySelector(`#${statId}`);
    const display = `<span title="${info.player.name}">${info.player.initials}</span>`;

    stat.querySelector('.percentage span').textContent = info.percentage;
    stat.querySelector('.player-photo').innerHTML = display;
};

/**
 * Update data inside statistics
 * 
 * @param {Array} teams All teams
 */
export const listStatistics = (teams) => {
    const picks = playersPicks(teams);

    if(picks.length > 0) {
        const orderedPicks = picks.slice().sort((a, b) => {
            return a.picks - b.picks;
        });
    
        updateStatistic('mostPickedPlayer', orderedPicks[orderedPicks.length - 1]);
        updateStatistic('lessPickedPlayer', orderedPicks[0]);
    }
};