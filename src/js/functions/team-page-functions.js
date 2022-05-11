import { searchPlayers } from '../storage/player-storage';

export const loadTeamData = (team) => {
    const form = document.getElementById('teamForm');

    form.name.value = team.name;
    form.description.value = team.description;
    form.website.value = team.website;
    form.type.value = team.type;
};

export const search = (event) => {
    const search = event.currentTarget.value;
    const players = searchPlayers(search);
    let playersHTML = '';

    players.forEach(player => {
        playersHTML += `
            <li class="player-infos">
                <div>
                    <div>
                        <span><b>Name:</b> ${player.name}</span> 
                    </div>
                    <div>
                        <span><b>Nationality:</b> ${player.nationality}</span>
                    </div>
                </div>
                <div>                                                
                    <span><b>Age:</b> ${player.age}</span>
                </div>
            </li>
        `;
    });

    document.querySelector('.search-players-results .players-list').innerHTML = playersHTML;
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
}

export const addPageEvents = () => {
    const searchInput = document.getElementById('searchPlayer');
    const tagInput = document.getElementById('tagInput');
    tagInput.addEventListener('keydown', insertTag)
    searchInput.addEventListener('keyup', search);
    searchInput.addEventListener('search', search);
};
