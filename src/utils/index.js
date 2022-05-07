export const getYear = () => {
    const date = new Date();
    return date.getFullYear();
}

export const getInitialLetters = (name) => {
    if (!name) {
        return '';
    }

    const nameSplited = name.split(' ');
    const initials = nameSplited.map((name) => name.charAt(0));

    return initials.join('').toUpperCase();
}