import css from './style.scss';
import { getInitialLetters } from '../../js/utils';

export default class ChoosePlayer extends HTMLElement {
    constructor() {
        super();
        this.build();
    }

    build() {
        const shadow = this.attachShadow({mode: 'open'});

        shadow.appendChild(this.styles());
        shadow.appendChild(this.createHTMLComponent().content);
    }

    styles() {
        const style = document.createElement('style');
        style.textContent = css;
        return style;
    }

    createHTMLComponent() {
        const id = this.getAttribute('id') || '';
        const name = this.getAttribute('name') || '';
        const nationality = this.getAttribute('nationality') || '';
        const age = JSON.parse(this.getAttribute('age'));
        const template = document.createElement('template');
        template.innerHTML = `
            <span class="choose-player" data-id="${id}" title="Name: ${name}\nNationality: ${nationality}\nAge: ${age || '-'}">
                ${getInitialLetters(name)}
            </span>
        `;

        return template;
    }
}

customElements.define('cmp-choose-player', ChoosePlayer);