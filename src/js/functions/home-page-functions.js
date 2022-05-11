import { ACTIONS } from '../constants.js';
import { playersPicks } from './player-functions.js';
import { sortTeams, teamsAgeAvgs } from './team-functions.js';
import { removeTeam } from '../storage/team-storage';

export const deleteTeam = (event) => {
    const teamId = event.currentTarget.dataset.id;
    document.querySelector(`#teamsTable tbody tr[data-id="${teamId}"]`).remove();
    removeTeam(+teamId);
};

export const addTeamTableEvents = () => {
    document.querySelectorAll(`[data-action=${ACTIONS.DELETE}]`).forEach(e => {
        e.addEventListener('click', deleteTeam);
    });

    document.querySelectorAll(`[data-sort]`).forEach(e => {
        e.addEventListener('click', sortTeams);
    });
};

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

export const listAvg = (listId, avgs) => {
    let avgHTML = '';

    for(let i = 0; i < 5; i++) {
        const avg = avgs[i];
        avgHTML += `<li><a href="/team.html?id=${avg.team.id}">${avg.team.name} <span>${avg.avg}</span></a></li>`;
    }

    document.querySelector(`#${listId} ul`).innerHTML = avgHTML;
};

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

export const updateStatistic = (statId, info) => {
    const stat = document.querySelector(`#${statId}`);
    const display = `<span title="${info.player.name}">${info.player.initials}</span>`;

    stat.querySelector('.percentage span').textContent = info.percentage;
    stat.querySelector('.player-photo').innerHTML = display;
};

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