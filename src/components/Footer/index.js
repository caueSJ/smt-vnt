import './style.scss';

import { getYear } from '../../utils';

const Footer = () => {
    return `
    <footer>
        <p>${getYear()} - All rights reserved</p>
    </footer>
    `;   
}

export default Footer;