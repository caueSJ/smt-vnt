import './styles/reset.css';
import './styles/global.scss';

import Header from './src/components/Header';
import Footer from './src/components/Footer';
import Section from './src/components/Section';

const $app = document.getElementById('app');
const htmlHeader = Header('Cauê SJ');
const htmlContent = Section();
const htmlFooter = Footer();

$app.insertAdjacentHTML('afterbegin', `
    ${htmlHeader}
    ${htmlContent}
    ${htmlFooter}
`);