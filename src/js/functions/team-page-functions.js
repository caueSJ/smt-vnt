import { getPlayer, searchPlayers } from '../storage/player-storage';
import { addTeam, editTeam } from '../storage/team-storage';
import { getUrlParams } from '../utils';

export const loadTeamData = (team) => {
    const form = document.getElementById('teamForm');

    form.name.value = team.name;
    form.description.value = team.description;
    form.website.value = team.website;
    form.type.value = team.type;

    team.players.forEach((playerId, index) => {
        const player = getPlayer(playerId);
        document.querySelector(`.player-circle.P${index + 1}`).innerHTML = `
            <cmp-choose-player id="${player.id}" name="${player.name}" nationality="${player.nationality}" age="${player.age}"></cmp-choose-player>
        `;
    });
};

export const enableDragNDrop = () => {
    $('.players-list li:not(.disabled)').draggable({
        revert: 'invalid',
        helper: 'clone',
        cursor: 'move',
    });

    $('.soccer-field .player-circle').droppable({
        accept: '.players-list li',
        tolerance: 'pointer',
        drop: function( event, ui ) {
            const droppable = $(this);
            const draggable = ui.draggable[0];
            const player = {
                id: draggable.dataset.id,
                name: draggable.dataset.name,
                nationality: draggable.dataset.nationality,
                age: draggable.dataset.age,
            };
            
            droppable.html(`
                <cmp-choose-player id="${player.id}" name="${player.name}" nationality="${player.nationality}" age="${player.age}"></cmp-choose-player>
            `);

            search({ currentTarget: document.getElementById('searchPlayer') });
        },
    });
};

export const getChoosePlayers = () => {
    const choosePlayersHTML = Array.from(document.querySelectorAll('.soccer-field cmp-choose-player'));
    const choosePlayers = choosePlayersHTML.map(p => {
        return +p.id;
    });
    return choosePlayers;
};

export const search = (event) => {
    const search = event.currentTarget.value;
    const players = searchPlayers(search);
    const choosePlayers = getChoosePlayers();

    let playersHTML = '';

    players.forEach(player => {
        const disabled = choosePlayers.indexOf(player.id) !== -1 ? 'disabled' : '';
        playersHTML += `
            <li class="player-infos ${disabled}" data-id="${player.id}" data-name="${player.name}" data-nationality="${player.nationality}" data-age="${player.age}">
                <div>
                    <div>
                        <span><b>Name:</b> ${player.name}</span> 
                    </div>
                    <div>
                        <span><b>Nationality:</b> ${player.nationality}</span>
                    </div>
                </div>
                <div>                                                
                    <span><b>Age:</b> ${player.age || '-'}</span>
                </div>
            </li>
        `;
    });

    document.querySelector('.search-players-results .players-list').innerHTML = playersHTML;
    enableDragNDrop();
};

export const initSearch = () => {
    search({ currentTarget: { value: '' }});
};

export const insertTag = (event) => {
    const newTag = event.currentTarget.value;
    let tagList = [];
    if ((event.keyCode === 13 || event.keyCode === 59) && tag.trim().length > 0) {
        const tagDivs = Array.from(document.getElementsByClassName('tag'));
        tagDivs.forEach(tag => {
            tagList.push(tag.firstChild.innerText);
        });
        if (tagList.find(tag => tag === newTag)) {
            return;
        }

        // Add new tag to tag list here
        event.currentTarget.value = null;
    }
};

export const submitForm = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    const tagsHTML = Array.from(form.querySelectorAll('.tag-list .tag'));
    const tags = tagsHTML.map(tag => {
        return tag.textContent.trim();
    });

    const players = getChoosePlayers();

    const team = {
        name: form.name.value,
        website: form.website.value,
        description: form.description.value,
        type: form.type.value,
        players,
        tags,
    };

    const params =  getUrlParams();

    if(params.id) {
        team.id = +params.id;
        editTeam(team);
    } else {
        const newTeamId = addTeam(team);
        window.location = `/team.html?id=${newTeamId}`;
    }   
};

const clearChoosePlayers = () => {
    document.querySelectorAll('.player-circle').forEach(p => {
        p.innerHTML = '';
    });
};

const changeFormation = (event) => {
    clearChoosePlayers();
};

export const addPageEvents = () => {
    const searchInput = document.getElementById('searchPlayer');
    searchInput.addEventListener('keyup', search);
    searchInput.addEventListener('search', search);

    const tagInput = document.getElementById('tagInput');
    tagInput.addEventListener('keydown', insertTag);

    const form = document.getElementById('teamForm');
    form.addEventListener('submit', submitForm);

    const selectFormation = document.getElementById('teamFormation');
    selectFormation.addEventListener('change', changeFormation);
};
