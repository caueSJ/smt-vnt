import css from './style.scss';
import { getInitialLetters } from '../../js/utils';

export default class Header extends HTMLElement {
    constructor() {
        super();
        this.build();
    }

    static get observedAttributes() {
        return ['user-name'];
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
        const userName = this.hasAttribute('user-name') ? this.getAttribute('user-name') : 'John Doe';
        const template = document.createElement('template');
        template.innerHTML = `
        <header>
            <div class="header-brand">
                <a href="/">
                    <img class="logo" src="./images/logo-vnt.svg" />
                    <h1>Squad Managment Tool</h1>
                </a>
            </div>
            <div class="header-user">
                <span class="name">${userName}</span>
                <div title="User Profile Picture">
                    <span>${getInitialLetters(userName)}</span>
                </div>
            </div>
        </header>
        `;

        return template;
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }

        if (attrName === 'user-name') {
            this.updateName(newValue);
        }
    }

    updateName(newName) {
        const shadow = this.shadowRoot;
        shadow.querySelector('.header-user > span').textContent = newName;
        shadow.querySelector('.header-user > div > span').textContent = getInitialLetters(newName);
    }
}

customElements.define('cmp-header', Header);