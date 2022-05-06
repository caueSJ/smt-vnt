export default class Header extends HTMLElement {
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
        style.textContent = `
            header {
                display: flex;
                flex-wrap: wrap;
                background: var(--main-gradient, purple);
                color: #ffffff;
                align-items: center;
                justify-content: space-between;
                padding: 0 50px;
            }

            .header-brand {
                display: flex;
                align-items: center;
                column-gap: 20px;
            }

            .logo {
                width: 48px;
                height: 48px;
            }

            .header-user {
                display: flex;
                align-items: center;
                column-gap: 10px;
            }

            .header-user p {
                font-weight: 600;
            }

            .header-user div {
                width: 42px;
                height: 42px;
                border-radius: 50%;
                background: #FFF;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                font-weight: 700;
                color: #000000;
            }
        `;
        return style;
    }

    createHTMLComponent() {
        const userName = this.hasAttribute('user-name') ? this.getAttribute('user-name') : 'John Doe';
        const headerTemplate = document.createElement('template');
        headerTemplate.innerHTML = `
        <header>
            <div class="header-brand">
                <img class="logo" src="public/images/logo-vnt.svg" />
                <h2>Squad Managment Tool</h2>
            </div>
            <div class="header-user">
                <p>${userName}</p>
                <div title="User Profile Picture">
                    <p>${this.getInitialLetters(userName)}</p>
                </div>
            </div>
        </header>
        `;

        return headerTemplate;
    }

    getInitialLetters(name) {
        let nameSplited = name.split(' ');
        let initials = nameSplited.map((name) => name.charAt(0));

        return initials.join('');
    }
}

customElements.define('header-component', Header);