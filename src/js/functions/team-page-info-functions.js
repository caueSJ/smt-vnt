/**
 * Return all tags inside tags area
 * 
 * @returns {Array} Tags
 */
export const getTags = () => {
    const tagsHTML = Array.from(document.querySelectorAll('.tag-list cmp-tag'));
    const tagList = tagsHTML.map(tag => {
        return tag.getAttribute('name').trim();
    });

    return tagList;
}

/**
 * Handle insert tag event
 * 
 * @param {Event} event 
 */
export const insertTag = (event) => {
    const newTag = event.currentTarget.value.trim();
    const tagList = getTags();

    if((event.keyCode !== 13 && event.key !== ';') || newTag.length === 0) {
        return;
    }

    event.preventDefault();

    if (tagList.includes(newTag)) {
        event.currentTarget.value = null;
        return;
    }

    document.getElementById('tagInput').insertAdjacentHTML('beforebegin', `<cmp-tag name="${newTag}"></cmp-tag>`);
    event.currentTarget.value = null;
};

/**
 * Focus tag input when tag array is clicked
 */
export const focusTagInput = () => {
    const tagInput = document.getElementById('tagInput');
    tagInput.focus();
};

/**
 * Add events related to tags
 */
export const addTagEvents = () => {
    const tagInput = document.getElementById('tagInput');
    tagInput.addEventListener('keydown', insertTag);

    const tabContainer = document.querySelector('.input-tag');
    tabContainer.addEventListener('click', focusTagInput);
};

/**
 * Validate name
 * 
 * @param {string} name Any name
 * @returns 
 */
export const validateName = (name) => {
    return (name === '') ? false : true;
};

/**
 * Validate website URL
 * 
 * @param {string} website Any website
 * @returns 
 */
export const validateWebsite = (website) => {
    const regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    return regex.test(website);
};
