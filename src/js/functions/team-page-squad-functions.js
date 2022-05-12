import { searchPlayers } from '../storage/player-storage';

/**
 * Update soccer field to show formation
 * 
 * @param {string} formation Football formation
 */
export const updateSoccerFieldFormation = (formation) => {
    const soccerField = document.querySelector('.soccer-field');
    soccerField.classList.forEach(e => {
        if(e.indexOf('formation') !== -1) {
            soccerField.classList.remove(e);
        }
    });
    soccerField.classList.add(`formation-${formation}`);
};

/**
 * Handle change formation event
 * 
 * @param {Event} event 
 */
export const changeFormation = (event) => {
    clearChoosePlayers();
    callSearch();
    updateSoccerFieldFormation(event.currentTarget.value);
};

/**
 * Enable drag n drop from players to soccer field
 */
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

            callSearch();
        },
    });
};

/**
 * Get choose players from soccer field
 * 
 * @returns {Array} Choose players
 */
export const getChoosePlayers = () => {
    const choosePlayersHTML = Array.from(document.querySelectorAll('.soccer-field cmp-choose-player'));
    const choosePlayers = choosePlayersHTML.map(p => {
        return +p.id;
    });
    return choosePlayers;
};

/**
 * Clear choose players from soccer field
 */
const clearChoosePlayers = () => {
    document.querySelectorAll('.player-circle').forEach(p => {
        p.innerHTML = '';
    });
};

/**
 * Filter players according to search
 * 
 * @param {Event} event 
 */
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

/**
 * Call search without event
 */
export const callSearch = () => {
    search({ currentTarget: document.getElementById('searchPlayer') });
};
