import css from './style.scss';
import { getYear } from '../../utils';

export default class Footer extends HTMLElement {
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
        const template = document.createElement('template');
        template.innerHTML = `
        <footer>
            <p>${getYear()} - All rights reserved</p>
        </footer>
        `;

        return template;
    }
}

customElements.define('cmp-footer', Footer);