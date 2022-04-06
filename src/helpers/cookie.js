export function setCookie(name, value, days = 6) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

export function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

export function removeCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export function setAuthCookies(token, user, type, id) {

    removeCookie('teammers-access-token');
    removeCookie('user');
    removeCookie('type');
    removeCookie('teammers-id');

    // if (!token || !user || !id) return;

    setCookie('teammers-access-token', token, 6);
    setCookie('user', user, 6);
    setCookie('teammers-type', type ? type.toString() : '', 6);
    setCookie('teammers-id', id, 6);
}

export const clearCookie = () => {
    removeCookie('teammers-access-token');
    removeCookie('user');
    removeCookie('type');
    removeCookie('teammers-id');
}