import { getInitialLetters } from '../../js/utils';

export default class ChoosePlayer extends HTMLElement {
    constructor() {
        super();
        this.build();
    }

    build() {
        const shadow = this.attachShadow({mode: 'open'});
        shadow.appendChild(this.createHTMLComponent().content);
    }

    createHTMLComponent() {
        const id = this.getAttribute('id') || '';
        const name = this.getAttribute('name') || '';
        const nationality = this.getAttribute('nationality') || '';
        const age = JSON.parse(this.getAttribute('age'));
        const template = document.createElement('template');
        template.innerHTML = `
            <span data-id="${id}" title="Name: ${name}\nNationality: ${nationality}\nAge: ${age || '-'}">
                ${getInitialLetters(name)}
            </span>
        `;

        return template;
    }
}

customElements.define('cmp-choose-player', ChoosePlayer);