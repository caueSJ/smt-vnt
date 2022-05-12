import css from './style.scss';

export default class Tag extends HTMLElement {
    
    constructor() {
        super();
        this.build();
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.remove-icon').addEventListener('click', this.deleteTag);
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
        const name = this.getAttribute('name') || '';
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="tag">
                <span>${name}</span>
                <span class="remove-icon">&#10005;</span>
            </div>
        `;

        return template;
    }

    deleteTag(event) {
        // Remove Shadow DOM host element
        document.querySelector(`cmp-tag[name="${event.currentTarget.parentNode.firstElementChild.innerText}"`).remove();
    }
}

customElements.define('cmp-tag', Tag);