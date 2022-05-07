import './style.scss';

const DivSection = (title, addButton = false) => {
    return `
        <article>
            <div class="header">
                <h2>${title}</h2>
                ${(addButton) ? button() : '' }
            </div>
            <div>
                <table>
                    <th>
                        <td>123</td>
                    </th>
                </table>
            </div>
        </article>
    `;
}

const button = () => `<button>+</button>`

export default DivSection;