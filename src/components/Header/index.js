import './style.scss';

const Header = (userName) => {
    let name = (userName !== '') ? userName : 'John Doe';
    return `
    <header>
        <div class="header-brand">
            <img class="logo" src="/images/logo-vnt.svg" />
            <h1>Squad Managment Tool</h1>
        </div>
        <div class="header-user">
            <p>${name}</p>
            <div title="User Profile Picture">
                <p>${getInitialLetters(name)}</p>
            </div>
        </div>
    </header>
    `
}

const getInitialLetters = (name) => {
    let nameSplited = name.split(' ');
    let initials = nameSplited.map((name) => name.charAt(0));

    return initials.join('');
}

export default Header;