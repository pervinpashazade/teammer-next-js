export const renderErrorMessages = err => {
    let errList = [];

    for (const [key, value] of Object.entries(err)) {
        value.map(item => errList.push(item))
    }

    return errList;
};