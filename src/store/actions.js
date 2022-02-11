const LOGIN = 'LOGIN';
const SET_DATA = "SET_DATA"
export const log_in = (data) => {
    return {
        type: LOGIN,
        payload: data
    }
}
export const setData = (key, data) => {
    return {
        type: SET_DATA,
        key: key,
        data: data
    }
}

export {LOGIN,SET_DATA}
