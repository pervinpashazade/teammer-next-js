export const STARTUP_TYPE = 1;
export const TEAMMER_TYPE = 2;
export const type = Number((typeof window !== 'undefined' && localStorage.getItem('type')) && localStorage.getItem('type'));
export const user = (typeof window !== 'undefined' && localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).full_name
let auth = type === STARTUP_TYPE ? 'STARTUP_TYPE' :
    type === TEAMMER_TYPE ? 'TEAMMER_TYPE' : 'GUESS';


export default auth;
