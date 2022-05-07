import './style.scss';

import DivSection from './DivSection';

const Section = () => {
    return `
        <section>
            ${DivSection('My Teams', true)}
            ${DivSection('Top 5')}
        </section>
    `;
}

export default Section;