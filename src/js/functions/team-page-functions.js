import { getPlayer } from '../storage/player-storage';
import { addTeam, editTeam } from '../storage/team-storage';
import { getCapitalWord, getUrlParams } from '../utils';
import { changeFormation, getChoosePlayers, search, updateSoccerFieldFormation } from './team-page-squad-functions';
import { addTagEvents, getTags, validateName, validateWebsite } from './team-page-info-functions';

/**
 * Update section title according to current status
 * 
 * @param {string} status create or edit
 */
export const updatePageTitle = (status) => {
    document.querySelector('.header h2').innerText = `${getCapitalWord(status)} your team`;
};

/**
 * Load HTML with team data
 * 
 * @param {Object} team Team information
 */
export const loadTeamData = (team) => {
    const form = document.getElementById('teamForm');

    form.name.value = team.name;
    form.description.value = team.description;
    form.website.value = team.website;
    form.type.value = team.type;

    if(!team.formation) {
        team.formation = '3-2-2-3';
    }

    form.formation.value = team.formation;
    updateSoccerFieldFormation(team.formation);

    team.players.forEach((playerId, index) => {
        const player = getPlayer(playerId);
        document.querySelector(`.player-circle.P${index + 1}`).innerHTML = `
            <cmp-choose-player id="${player.id}" name="${player.name}" nationality="${player.nationality}" age="${player.age}"></cmp-choose-player>
        `;
    });

    team.tags.forEach(tag => {
        document.getElementById('tagInput').insertAdjacentHTML('beforebegin', `<cmp-tag name="${tag}"></cmp-tag>`);
    });
};

/**
 * Validate single input
 * 
 * @param {Event} event 
 */
const validateInput = (event) => {
    let hasError = false;
    const input = event.currentTarget;

    if (input.value.trim().length > 0) {
        for (const error in input.validity) {
            if (input.validity[error] && !input.validity.valid) {
                hasError = true;
            }
        }
    } else {
        hasError = true;
    }

    if (hasError) {
        input.parentElement.classList.add('error');
    } else {
        input.parentElement.classList.remove('error');
    }
};

/**
 * Validate all form
 * 
 * @param {FormElement} form 
 * @returns {boolean} Indicate if form is valid or not
 */
const validateForm = (form) => {
    const validName = validateName(form.name.value.trim());
    const validWebsite = validateWebsite(form.website.value.trim());

    if (!validName) {
        form.name.value = '';
        form.name.parentElement.classList.add('error');
    }
    
    if (!validWebsite) {
        form.website.value = '';
        form.website.parentElement.classList.add('error');
    }

    return (validName && validWebsite);
};

/**
 * Handle team form submit
 * 
 * @param {Event} event
 */
export const submitForm = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!validateForm(form)) {
        return;
    }

    const tags = getTags();
    const players = getChoosePlayers();

    const team = {
        name: form.name.value,
        website: form.website.value,
        description: form.description.value,
        type: form.type.value,
        formation: form.formation.value,
        players,
        tags,
    };

    const params = getUrlParams();

    if (params.id) {
        team.id = +params.id;
        editTeam(team);

        const message = form.querySelector('.message');
        if(!message) {
            form.insertAdjacentHTML('beforeend', '<span class="message">Team successfully updated</span>');
        }
    } else {
        const newTeamId = addTeam(team);
        window.location = `/team.html?id=${newTeamId}`;
    }   
};

/**
 * Add validation listeners to input
 * 
 * @param {InputElement} input 
 */
const addValidationListeners = (input) => {
    input.addEventListener('invalid', validateInput);
    input.addEventListener('blur', validateInput);
};

/**
 * Add events to team page
 */
export const addPageEvents = () => {
    const searchInput = document.getElementById('searchPlayer');
    searchInput.addEventListener('keyup', search);
    searchInput.addEventListener('search', search);

    const form = document.getElementById('teamForm');
    form.addEventListener('submit', submitForm);

    const selectFormation = document.getElementById('teamFormation');
    selectFormation.addEventListener('change', changeFormation);

    const inputsToValidate = document.querySelectorAll('[required]');
    inputsToValidate.forEach(input => addValidationListeners(input));

    addTagEvents();
};
