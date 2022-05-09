import './global.js';
import '../../styles/home-style.scss';

import { ACTIONS, ORDER_ICON, ORDER_MAP } from './constants.js';

const players = [
    {id: 1, name: 'Player 1', age: 30},
    {id: 2, name: 'Player 2', age: 31},
    {id: 3, name: 'Player 3', age: 33},
    {id: 4, name: 'Player 4', age: 35},
    {id: 5, name: 'Player 5', age: 37},
];

const teams = [
    {id: 1, name: 'Barcelona', description: 'Barcelona Squad', players: [1, 2]},
    {id: 2, name: 'Real Madrid', description: 'Real Madrid Squad', players: [1, 3]},
    {id: 3, name: 'Milan', description: 'Milan Squad', players: [1, 4]},
    {id: 4, name: 'Liverpool', description: 'Liverpool Squad', players: [2, 3]},
    {id: 5, name: 'Bayern Munich', description: 'Bayern Munich Squad', players: [1, 5]},
    {id: 6, name: 'Lazio', description: 'Lazio Squad', players: [1, 5]},
];

const deleteTeam = (event) => {
    const teamId = event.currentTarget.dataset.id;
    const teamIndex = teams.findIndex(team => team.id === +teamId);
    teams.splice(teamIndex, 1);
    document.querySelector(`#teamsTable tbody tr[data-id="${teamId}"]`).remove();
};

const sortTeams = (event) => {
    const target = event.currentTarget;
    const field = target.dataset.sort;
    const prevOrder = target.dataset.order;
    const newOrder = ORDER_MAP[prevOrder];

    const teamsInOrder = teams.slice().sort((a, b) => {
        if(newOrder === 0) {
            return 0; // Original order
        } else if(newOrder === 1) {
            return a[field].localeCompare(b[field]); // A - Z
        } else if(newOrder === -1) {
            return b[field].localeCompare(a[field]); // Z - A
        }
    });

    listTeams(teamsInOrder);

    target.dataset.order = newOrder;
    target.classList.remove(ORDER_ICON[prevOrder]);
    target.classList.add(ORDER_ICON[newOrder]);
};

const addTeamTableEvents = () => {
    document.querySelectorAll(`[data-action=${ACTIONS.DELETE}]`).forEach(e => {
        e.addEventListener('click', deleteTeam);
    });

    document.querySelectorAll(`[data-sort]`).forEach(e => {
        e.addEventListener('click', sortTeams);
    });
};

const listTeams = (teams) => {
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

const calcAvgs = (teams) => {
    const avgs = [];

    teams.forEach(team => {
        let totalAge = 0;
        let numPlayers = 0;
        
        team.players.forEach(playerId => {
            const player = players.find(player => player.id === playerId);
            totalAge += player.age;
            numPlayers++;
        });

        const avg = totalAge / numPlayers;
        avgs.push({
            team: {
                id: team.id,
                name: team.name,
            },
            avg,
        });
    });

    return avgs;
};

const listAvg = (listId, avgs) => {
    let avgHTML = '';

    for(let i = 0; i < 5; i++) {
        const avg = avgs[i];
        avgHTML += `<li><a href="/team.html?id=${avg.team.id}">${avg.team.name} <span>${avg.avg}</span></a></li>`;
    }

    document.querySelector(`#${listId} ul`).innerHTML = avgHTML;
};

const listTop5 = (teams) => {
    const avgs = calcAvgs(teams);
    const avgsHighToLow = avgs.slice().sort((a, b) => {
        return b.avg - a.avg;
    });
    const avgsLowToHigh = avgs.slice().sort((a, b) => {
        return a.avg - b.avg;
    });

    listAvg('highAgeAvg', avgsHighToLow);
    listAvg('lowAgeAvg', avgsLowToHigh);
};

listTeams(teams);
listTop5(teams);
